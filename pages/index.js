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
    const loadAndCheckUser = () => {
      const stored = localStorage.getItem("user");
      if (!stored) return;

      let userData = JSON.parse(stored);
      const now = new Date();
      const resetDate = new Date(userData.resetDate || now);

      // 🔥 Reset if new month
      if (
        now.getMonth() !== resetDate.getMonth() ||
        now.getFullYear() !== resetDate.getFullYear()
      ) {
        userData.usage = 0;
        userData.resetDate = now.toISOString();
        localStorage.setItem("user", JSON.stringify(userData));
      }

      // 🔥 Update state after potential reset
      setUser(userData);
    };

    loadAndCheckUser();
    window.addEventListener("focus", loadAndCheckUser);
    return () => window.removeEventListener("focus", loadAndCheckUser);
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

    // 🔥 LIMIT CHECK (Moved inside the action function)
    if (user.plan === "starter" && user?.usage >= 100) {
      return showMsg("❌ Monthly limit reached (100 emails)", true);
    }

    try {
      showMsg("⏳ Generating...");
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!data.email) throw new Error("No email returned");

      setEmail(data.email);

      // Update usage logic
      const updatedUser = { ...user, usage: (user?.usage || 0) + 1 };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

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

  const handleGenerate = async () => {
  let user = null;

  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("user");
    user = stored ? JSON.parse(stored) : null;
  }

  // ✅ RESET LOGIC HERE
  if (user) {
    const now = new Date();
    const resetDate = new Date(user.resetDate);

    if (
      now.getMonth() !== resetDate.getMonth() ||
      now.getFullYear() !== resetDate.getFullYear()
    ) {
      user.usage = 0;
      user.resetDate = now.toISOString();
      localStorage.setItem("user", JSON.stringify(user));
    }

    const getLimit = (plan) => {
  if (plan === "free") return 3;
  if (plan === "starter") return 100;
  return Infinity; // pro + agency
};
  }

  // ✅ LIMIT CHECK
 const limit = getLimit(user?.plan);

if ((user?.usage || 0) >= limit) {
  setMessage(`❌ Limit reached (${limit} emails per month)`);
  return;
}


<p>
  Usage: {user?.usage || 0} / {limit === Infinity ? "∞" : limit}
</p>

  
  // 👉 CALL YOUR API HERE

  // ✅ AFTER SUCCESS → INCREMENT USAGE
  if (user) {
    user.usage = (user.usage || 0) + 1;
    localStorage.setItem("user", JSON.stringify(user));
  }
};

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>AI Sales Outreach</h1>

        <p>
        Usage: {user?.usage} / 100 this month
        </p>

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


{/* ✅ UPGRADE BUTTON */}
{(plan === "free" && usage >= 5) && (
  <button
    style={styles.upgradeBtn}
    onClick={() => router.push("/pricing")}
  >
    🚀 Upgrade Plan
  </button>
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

        {(plan === "free" || plan === "starter") && (
       <button
       style={styles.upgradeBtn}
      onClick={() => router.push("/pricing")}
      >
        🔒 Unlock Bulk Feature
     </button>
)}
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
     background: "#fff" },

   upgradeBtn: {
  marginTop: "10px",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  fontWeight: "600",
  cursor: "pointer",
  background: "linear-gradient(135deg, #ff9f43, #ff6b6b)",
  color: "#fff",
  transition: "0.2s",
},

};