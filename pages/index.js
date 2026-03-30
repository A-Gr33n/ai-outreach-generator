import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  
  // Grouping related state
  const [form, setForm] = useState({ name: "", company: "", website: "", industry: "" });
  const [email, setEmail] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [message, setMessage] = useState({ text: "", isError: false });
  const [user, setUser] = useState(null);
  const [usage, setUsage] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const storedUsage = localStorage.getItem("usage");
    if (storedUsage) setUsage(parseInt(storedUsage));
  }, []);

  const plan = user?.plan || "free";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showMsg = (text, isError = false) => setMessage({ text, isError });

  const generateEmail = async () => {
    if (!user) {
      alert("Login required");
      return router.push("/login");
    }

    if (plan === "free" && usage >= 5) {
      return showMsg("❌ Free limit reached. Upgrade required.", true);
    }

    try {
      showMsg("⏳ Generating...");
      const res = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!data.email) throw new Error("No email returned");

      setEmail(data.email);

      if (plan === "free") {
        const newUsage = usage + 1;
        setUsage(newUsage);
        localStorage.setItem("usage", newUsage);
      }
      showMsg("✅ Email generated!");
    } catch (err) {
      showMsg("❌ Error generating email", true);
    }
  };

  const handleBulkGenerate = () => {
    if (!user) return router.push("/login");
    if (plan !== "pro") return alert("Upgrade to PRO for Bulk Generate");
    alert("Bulk working 🚀");
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>AI Sales Outreach</h1>

        <div style={styles.planBox}>
          <strong>Plan:</strong> {plan.toUpperCase()}
          {plan === "free" && <div>Usage: {Math.min(usage, 5)}/5</div>}
        </div>

        {/* FORM */}
        <div style={styles.card}>
          <input name="name" placeholder="Name" style={styles.input} onChange={handleChange} />
          <input name="company" placeholder="Company" style={styles.input} onChange={handleChange} />
          <input name="website" placeholder="Website" style={styles.input} onChange={handleChange} />
          <input name="industry" placeholder="Industry" style={styles.input} onChange={handleChange} />
          <button style={styles.button} onClick={generateEmail}>Generate Email</button>
        </div>

        {/* FEEDBACK MESSAGE */}
        {message.text && (
          <p style={{ ...styles.messageTop, color: message.isError ? "red" : "green" }}>
            {message.text}
          </p>
        )}

        {/* EMAIL OUTPUT */}
        {email && (
          <div style={styles.card}>
            <h3>Generated Email</h3>
            <pre style={styles.emailBox}>{email}</pre>
            <button style={styles.copyBtn} onClick={() => navigator.clipboard.writeText(email)}>
              Copy Email
            </button>
          </div>
        )}


        {/* BULK */}
        <div style={styles.card}>
          <h2>📂 Bulk Generate (CSV)</h2>
          <label style={styles.uploadBox}>
            <input type="file" accept=".csv" onChange={(e) => setCsvFile(e.target.files[0])} hidden />
            {csvFile ? `📄 ${csvFile.name}` : "Click to upload CSV"}
          </label>
          <button
            style={{
              ...styles.button,
              opacity: (plan === "free" || plan === "starter") ? 0.5 : 1,
              cursor: (plan === "free" || plan === "starter") ? "not-allowed" : "pointer"
            }}
            disabled={plan === "free" || plan === "starter"}
            onClick={handleBulkGenerate}
          >
            Generate From CSV
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page:
   { minHeight: "100vh", display: "flex", 
    justifyContent: "center", padding: "20px", 
    background: "#f5f6fa", 
  fontFamily: "sans-serif" },
  
  container: 
  { width: "100%",
     maxWidth: "500px", 
     display: "flex", 
     flexDirection: "column", 
     gap: "20px" },
  
     title: {
       textAlign: "center", 
       color: "#333" },

  planBox: 
  { background: "#e3e8ff", 
    padding: "15px",
     borderRadius: "12px", 
     textAlign: "center" },

  card: 
  { background: "#fff", 
    padding: "20px", 
    borderRadius: "12px", 
    display: "flex", 
    flexDirection: "column", 
    gap: "12px", 
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)" },

  input: 
  { padding: "12px", 
    borderRadius: "8px", 
    border: "1px solid #ddd" },

  button: 
  { padding: "14px",
     borderRadius: "10px", 
     border: "none",
      background: "linear-gradient(135deg, #4b4ded, #7a5cff)", 
      color: "#fff", 
      fontWeight: "bold", 
      cursor: "pointer" },

  uploadBox: { padding: "20px", 
    border: "2px dashed #ccc",
     borderRadius: "10px", 
     textAlign: "center", 
     cursor: "pointer" },

  emailBox: 
  { whiteSpace: "pre-wrap",
     background: "#f9f9f9",
     padding: "15px", 
     borderRadius: "8px", 
     border: "1px solid #eee", 
     fontSize: "14px" },

  copyBtn: 
  { padding: "10px", 
    borderRadius: "8px", 
    border: "none", background: "#00b894",
     color: "#fff", 
     cursor: "pointer" },

  messageTop: 
  { textAlign: "center", 
    fontWeight: "600",
     padding: "10px", 
     borderRadius: "8px", 
     background: "#fff" }
};