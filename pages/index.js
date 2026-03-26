import { useState, useEffect, useRef } from "react";
import Papa from "papaparse";

export default function Home() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [plan, setPlan] = useState("FREE");
  const [fileName, setFileName] = useState("");

  const fileInputRef = useRef();

  // ✅ Reset usage every 30 days
  const checkAndResetUsage = () => {
    const savedDate = localStorage.getItem("lastResetDate");

    if (!savedDate) {
      localStorage.setItem("lastResetDate", new Date().toISOString());
      return 0;
    }

    const lastReset = new Date(savedDate);
    const now = new Date();
    const diffDays = (now - lastReset) / (1000 * 60 * 60 * 24);

    if (diffDays >= 30) {
      localStorage.setItem("lastResetDate", now.toISOString());
      localStorage.setItem("usageCount", "0");
      return 0;
    }

    return parseInt(localStorage.getItem("usageCount") || "0");
  };

  // ✅ Load plan + usage
  useEffect(() => {
    const savedPlan = localStorage.getItem("plan");
    if (savedPlan) setPlan(savedPlan);

    const usage = checkAndResetUsage();
    setUsageCount(usage);
  }, []);

  // ✅ Plan limits
  const getLimit = () => {
    switch (plan) {
      case "FREE":
        return 3;
      case "STARTER":
        return 100;
      case "PRO":
      case "AGENCY":
        return Infinity;
      default:
        return 3;
    }
  };

  // ✅ Feature control
  const hasFeature = (feature) => {
    const features = {
      FREE: [],
      STARTER: [],
      PRO: ["bulk", "download"],
      AGENCY: ["bulk", "download", "team"],
    };
    return features[plan]?.includes(feature);
  };

  // ✅ Generate email
  const handleGenerate = async () => {
    if (usageCount >= getLimit()) {
      alert(`Limit reached for ${plan} plan`);
      return;
    }

    if (!name || !company) {
      alert("Please fill in Name and Company");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, company, website, industry }),
      });

      const data = await res.json();
      setEmail(data.email);

      setUsageCount((prev) => {
        const newCount = prev + 1;
        localStorage.setItem("usageCount", newCount.toString());
        return newCount;
      });

    } catch (err) {
      alert("Error generating email");
    }

    setLoading(false);
  };

  const handleFileUpload = (e) => {
  if (!hasFeature("bulk")) {
    alert("🚫 Bulk CSV only available on PRO & AGENCY");
    return;
  }

  const file = e.target.files[0];
  if (!file) return;

  setFileName(file.name);

  Papa.parse(file, {
    header: true,
    complete: async (results) => {
      try {
        const res = await fetch("http://localhost:5000/api/bulk-generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ leads: results.data }),
        });

        const data = await res.json();

        downloadCSV(data.results);
      } catch (err) {
        alert("Bulk generation failed");
      }
    },
  });
};

  // ✅ Download campaign
  const handleDownload = () => {
    if (!hasFeature("download")) {
      alert("🚫 Upgrade to PRO for downloads");
      return;
    }

    const blob = new Blob([email], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "campaign.txt";
    a.click();
  };

  const downloadCSV = (rows) => {
  const csv = [
    ["Name", "Company", "Email"],
    ...rows.map(r => [r.name, r.company, r.email])
  ]
    .map(e => e.join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "bulk_emails.csv";
  a.click();
};

  return (
    <div className="container">
      <h1>AI Sales Outreach Generator</h1>

      {/* PLAN */}
      <p className="plan-box">
        Current Plan: <strong>{plan}</strong>
      </p>

      {/* PLAN INFO */}
      {plan === "FREE" && (
        <p className="info-box">
          🎉 First 3 emails are free. Upgrade for more.
        </p>
      )}

      {plan === "STARTER" && (
        <p className="info-box">
          Emails left this month: <strong>{100 - usageCount}</strong>
        </p>
      )}

      {plan === "PRO" && (
        <p className="info-box">
          ✅ Unlimited emails + Bulk CSV + Downloads enabled
        </p>
      )}

      {plan === "AGENCY" && (
        <p className="info-box">
          🚀 Full access: Bulk outreach + Team features
        </p>
      )}

      {/* FORM */}
      <div className="card">
        <input className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="input" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
        <input className="input" placeholder="Website" value={website} onChange={(e) => setWebsite(e.target.value)} />
        <input className="input" placeholder="Industry" value={industry} onChange={(e) => setIndustry(e.target.value)} />

        <button className="button" onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate Email"}
        </button>

        {/* BULK */}
        <button
          className="button-secondary"
          disabled={!hasFeature("bulk")}
          onClick={() => fileInputRef.current.click()}
        >
          Bulk Generate (CSV)
        </button>

        {!hasFeature("bulk") && (
          <p style={{ fontSize: "12px", color: "gray" }}>
            🔒 Available on PRO & AGENCY
          </p>
        )}

        {hasFeature("bulk") && (
          <p style={{ fontSize: "12px", color: "gray" }}>
            Upload CSV to generate multiple emails
          </p>
        )}

        <input
          type="file"
          accept=".csv"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />

        {fileName && <p>Uploaded: {fileName}</p>}

        {/* OUTPUT */}
        {email && (
          <>
            <textarea className="textarea" rows={10} value={email} readOnly />

            {hasFeature("download") && (
              <button className="button-secondary" onClick={handleDownload}>
                📥 Download Campaign
              </button>
            )}
          </>
        )}
      </div>

      {/* AGENCY FEATURES */}
      {plan === "AGENCY" && (
        <div style={{
          marginTop: "25px",
          padding: "20px",
          background: "#eef2ff",
          borderRadius: "12px"
        }}>
          <h3>🚀 Agency Tools</h3>

          <button
            className="button"
            onClick={() => alert("Bulk outreach started (demo)")}
          >
            Run Bulk Outreach Campaign
          </button>

          <p style={{ fontSize: "13px" }}>
            Send campaigns to multiple leads at once
          </p>

          <div style={{
            marginTop: "15px",
            padding: "15px",
            background: "#f9fafb",
            borderRadius: "10px"
          }}>
            <h4>👥 Team Usage</h4>
            <p>3 team members active</p>
            <p style={{ fontSize: "12px", color: "gray" }}>
              Manage access and collaborate
            </p>
          </div>
        </div>
      )}
    </div>
  );
}