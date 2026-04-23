import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase";


export default function Home() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    company: "",
    website: "",
    industry: "",
  });

  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [csvFile, setCsvFile] = useState(null);

  // ✅ LOAD USER
  useEffect(() => {
    const loadUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) return;

      setUser({
        id: data.user.id,
        email: data.user.email,
        plan: "free",
        usage: 0,
      });
    };

    loadUser();
  }, []);

  // ✅ PLAN LIMITS
  const getLimit = (plan) => {
    if (plan === "free") return 3;
    if (plan === "starter") return 100;
    if (plan === "pro") return 1000;
    if (plan === "agency") return Infinity;
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ GENERATE EMAIL (SAFE)
  const generateEmail = async () => {
    // validation FIRST (safe place)
    if (!form.name || !form.company) {
      setMessage("❌ Please fill in name and company");
      return;
    }

    if (!user) {
      alert("Login first");
      router.push("/login");
      return;
    }

    const limit = getLimit(user.plan);

    if ((user.usage || 0) >= limit) {
      setMessage(`❌ Limit reached (${limit}/month)`);
      return;
    }

    try {
      setMessage("⏳ Generating...");

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.email) {
        throw new Error(data.error || "No email returned");
      }

      setEmail(data.email);

      await supabase.from("emails").insert([
        {
          user_id: user.id,
          subject: "Outreach Email",
          content: data.email,
        },
      ]);

      setUser((prev) => ({
        ...prev,
        usage: (prev?.usage || 0) + 1,
      }));

      setMessage("✅ Email generated & saved");
    } catch (err) {
      console.error(err);
      setEmail("");
      setMessage("❌ Error generating email");
    }
  };

  // ✅ BULK GENERATE
const handleBulkGenerate = async () => {
  if (!user) return router.push("/login");

  if (user.plan === "free" || user.plan === "starter") {
    return alert("Upgrade to PRO to use Bulk Generator");
  }

  if (!csvFile) {
    return alert("Upload CSV first");
  }

  const text = await csvFile.text();

  const { parseCSV } = await import("../lib/csvParser");
  const leads = parseCSV(text);

  setMessage("⏳ Generating bulk emails...");

  try {
    const res = await fetch("/api/bulk-generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ leads }),
    });

    const data = await res.json();

    setGeneratedEmails(data.results);
    setMessage("✅ Bulk emails generated");

  } catch (err) {
    console.error(err);
    setMessage("❌ Bulk generation failed");
  }
};

const downloadCSV = () => {
  if (!generatedEmails.length) return;

  const headers = Object.keys(generatedEmails[0]).join(",");
  const rows = generatedEmails.map(obj =>
    Object.values(obj).map(v => `"${v}"`).join(",")
  );

  const csv = [headers, ...rows].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "campaign.csv";
  a.click();
};



  const plan = user?.plan || "free";
  const usage = user?.usage || 0;
  const limit = getLimit(plan);
  const [generatedEmails, setGeneratedEmails] = useState([]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>AI Sales Outreach</h1>

        <p>
          Usage: {usage} / {limit === Infinity ? "∞" : limit}
        </p>

        <div style={styles.planBox}>
          <strong>Plan:</strong> {plan.toUpperCase()}
        </div>

        {/* FORM */}
        <div style={styles.card}>
          <input name="name" placeholder="Name" style={styles.input} onChange={handleChange} />
          <input name="company" placeholder="Company" style={styles.input} onChange={handleChange} />
          <input name="website" placeholder="Website" style={styles.input} onChange={handleChange} />
          <input name="industry" placeholder="Industry" style={styles.input} onChange={handleChange} />

          <button style={styles.button} onClick={generateEmail}>
            Generate Email
          </button>
        </div>

        {/* MESSAGE */}
        {message && (
          <p
            style={{
              ...styles.message,
              color: message.includes("❌") ? "red" : "green",
            }}
          >
            {message}
          </p>
        )}

        {/* OUTPUT */}
        {email && (
          <div style={styles.card}>
            <h3>Generated Email</h3>

            <pre style={styles.emailBox}>{email}</pre>

            <button
              style={styles.copyBtn}
              onClick={() => navigator.clipboard.writeText(email)}
            >
              Copy Email
            </button>
          </div>
        )}

        {/* BULK */}
        <div style={styles.card}>
          <h2>📂 Bulk Email Generator</h2>

          <label style={styles.uploadBox}>
            <input
              type="file"
              accept=".csv"
              hidden
              onChange={(e) => setCsvFile(e.target.files[0])}
            />
            {csvFile ? `📄 ${csvFile.name}` : "Click to upload CSV"}
          </label>

          <button
            style={{
              ...styles.button,
              opacity: plan === "free" || plan === "starter" ? 0.5 : 1,
              cursor:
                plan === "free" || plan === "starter"
                  ? "not-allowed"
                  : "pointer",
            }}
            disabled={plan === "free" || plan === "starter"}
            onClick={handleBulkGenerate}
          >
            Generate From CSV
          </button>

          {(plan === "free" || plan === "starter") && (
            <button
              style={styles.upgradeBtn}
              onClick={() => router.push("/pricing")}
            >
              🔒 Upgrade to unlock Bulk
            </button>
          )}

          {generatedEmails.length > 0 && (
  <button style={styles.button} onClick={downloadCSV}>
    📥 Download Campaign CSV
  </button>
)}
        </div>
      </div>
    </div>
  );
}

// styles unchanged
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f6fa",
  },
  container: {
    width: "100%",
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  title: { textAlign: "center" },
  planBox: {
    background: "#e3e8ff",
    padding: "15px",
    borderRadius: "12px",
    textAlign: "center",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  button: {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #4b4ded, #7a5cff)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  uploadBox: {
    padding: "20px",
    border: "2px dashed #ccc",
    borderRadius: "10px",
    textAlign: "center",
    cursor: "pointer",
  },
  emailBox: {
    whiteSpace: "pre-wrap",
    background: "#f9f9f9",
    padding: "15px",
    borderRadius: "8px",
    border: "1px solid #eee",
    fontSize: "14px",
  },
  copyBtn: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#00b894",
    color: "#fff",
    cursor: "pointer",
  },
  message: {
    textAlign: "center",
    fontWeight: "600",
  },
  upgradeBtn: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    background: "linear-gradient(135deg, #ff9f43, #ff6b6b)",
    color: "#fff",
  },
};