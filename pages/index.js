import { useState, useEffect } from "react";
import { useRouter } from "next/router";

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

  // ✅ PLAN LIMITS
  const getLimit = (plan) => {
    if (plan === "free") return 3;
    if (plan === "starter") return 100;
    if (plan === "pro") return 1000;
    if (plan === "agency") return Infinity;
  };

  // ✅ LOAD USER + RESET MONTHLY
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return;

    let userData = JSON.parse(stored);

    const now = new Date();
    const resetDate = new Date(userData.resetDate);

    if (
      now.getMonth() !== resetDate.getMonth() ||
      now.getFullYear() !== resetDate.getFullYear()
    ) {
      userData.usage = 0;
      userData.resetDate = now.toISOString();
    }

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ SINGLE EMAIL GENERATE
  const generateEmail = async () => {
    if (!user) {
      alert("Login first");
      return router.push("/login");
    }

    const limit = getLimit(user.plan);

    if ((user.usage || 0) >= limit) {
      return setMessage(`❌ Limit reached (${limit}/month)`);
    }

    try {
      setMessage("⏳ Generating...");

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setEmail(data.email);

      const updatedUser = {
        ...user,
        usage: (user.usage || 0) + 1,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setMessage("✅ Email generated");
    } catch {
      setMessage("❌ Error generating email");
    }
  };

  // ✅ BULK GENERATE (LOCKED FOR FREE/STARTER)
  const handleBulkGenerate = () => {
    if (!user) return router.push("/login");

    if (user.plan === "free" || user.plan === "starter") {
      return alert("Upgrade to PRO to use Bulk Generator");
    }

    if (!csvFile) {
      return alert("Upload CSV first");
    }

    // 🚀 placeholder (you can connect backend later)
    alert("Bulk generation started 🚀");
  };

  const plan = user?.plan || "free";
  const limit = getLimit(plan);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>AI Sales Outreach</h1>

        {/* USAGE */}
        <p style={styles.usage}>
          Usage: {user?.usage || 0} / {limit === Infinity ? "∞" : limit}
        </p>

        {/* PLAN */}
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
          <p style={{ ...styles.message, color: message.includes("❌") ? "red" : "green" }}>
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

        {/* 🔥 BULK SECTION */}
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
              opacity: (plan === "free" || plan === "starter") ? 0.5 : 1,
              cursor: (plan === "free" || plan === "starter") ? "not-allowed" : "pointer",
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
        </div>
      </div>
    </div>
  );
}

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

  title: {
    textAlign: "center",
  },

  usage: {
    textAlign: "center",
    fontWeight: "500",
  },

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