import { useState, useEffect, useRef } from "react";

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

  // ✅ Check & reset usage every 30 days
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

      // ✅ Save usage
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

  // ✅ Bulk upload (PRO only)
  const handleFileUpload = (e) => {
    if (plan === "FREE" || plan === "STARTER") {
      alert("🚫 Bulk CSV is only available on PRO and AGENCY plans");
      return;
    }

    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    alert(`Uploaded: ${file.name}`);
  };

  return (
    <div className="container">
      <h1>AI Sales Outreach Generator</h1>

      {/* PLAN DISPLAY */}
      <p className="plan-box">
        Current Plan: <strong>{plan}</strong>
      </p>

      {/* FREE MESSAGE */}
      {plan === "FREE" && (
        <p className="info-box">
          🎉 First 3 emails are free. Upgrade for more.
        </p>
      )}

      {/* STARTER USAGE */}
      {plan === "STARTER" && (
        <p className="info-box">
          Emails left this month: <strong>{100 - usageCount}</strong>
        </p>
      )}

      {/* FORM */}
      <div className="card">
        <input
          className="input"
          placeholder="Contact Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="input"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          className="input"
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />

        <input
          className="input"
          placeholder="Industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        />

        {/* GENERATE BUTTON */}
        <button className="button" onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate Email"}
        </button>

        {/* BULK BUTTON */}
        <button
          className="button-secondary"
          disabled={plan === "FREE" || plan === "STARTER"}
          onClick={() => {
            if (plan === "FREE" || plan === "STARTER") {
              alert("🚫 Bulk CSV is only available on PRO and AGENCY plans");
              return;
            }
            fileInputRef.current.click();
          }}
        >
          Bulk Generate (CSV)
        </button>

        {/* LOCK MESSAGE */}
        {(plan === "FREE" || plan === "STARTER") && (
          <p style={{ fontSize: "12px", color: "gray", marginTop: "5px" }}>
            🔒 Available on PRO & AGENCY plans only
          </p>
        )}

        {/* FILE INPUT */}
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
          <textarea
            className="textarea"
            rows={10}
            value={email}
            readOnly
          />
        )}
      </div>
    </div>
  );
}