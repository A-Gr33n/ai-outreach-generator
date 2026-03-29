import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    website: "",
    industry: "",
  });

  const [email, setEmail] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const plan = user?.plan || "free";

  // ---------------- FORM ----------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------- GENERATE EMAIL ----------------
  const generateEmail = async () => {
    try {
      if (!user) {
        alert("Login required");
        router.push("/login");
        return;
      }

      setMessage("⏳ Generating...");

      const res = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      console.log("API RESPONSE:", data);

      if (!data.email) {
        throw new Error("No email returned");
      }

      setEmail(data.email);
      setMessage("✅ Email generated!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Error generating email");
    }
  };

  // ---------------- CSV ----------------
  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
  };

  const handleBulkGenerate = () => {
    alert("Bulk feature coming soon 🚀");
  };

  // ---------------- UI ----------------
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>AI Sales Outreach Generator</h1>

        <div style={styles.planBox}>
          <strong>Current Plan:</strong> {plan.toUpperCase()}
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

        {/* EMAIL OUTPUT */}
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
          <h2>📂 Bulk Generate (CSV)</h2>

          <label style={styles.uploadBox}>
            <input type="file" accept=".csv" onChange={handleCSVUpload} hidden />
            Click to upload CSV
          </label>

          {csvFile && <p>📄 {csvFile.name}</p>}

          <button style={styles.button} onClick={handleBulkGenerate}>
            Generate Emails From CSV
          </button>
        </div>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

// ---------------- STYLES ----------------
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

  planBox: {
    background: "#e3e8ff",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  button: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #4b4ded, #7a5cff)",
    color: "#fff",
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
    background: "#fafafa",
    padding: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  copyBtn: {
    marginTop: "10px",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#00b894",
    color: "#fff",
    cursor: "pointer",
  },
};