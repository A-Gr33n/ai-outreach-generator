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

  // ✅ LIMITS
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

      // ✅ INCREMENT USAGE
      const updatedUser = {
        ...user,
        usage: (user.usage || 0) + 1,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setMessage("✅ Email generated");
    } catch {
      setMessage("❌ Error");
    }
  };

  const plan = user?.plan || "free";
  const limit = getLimit(plan);

  return (
    <div style={styles.page}>
      <h1>AI Sales Outreach</h1>

      <p>
        Usage: {user?.usage || 0} / {limit === Infinity ? "∞" : limit}
      </p>

      <p>Plan: {plan}</p>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="company" placeholder="Company" onChange={handleChange} />
      <input name="website" placeholder="Website" onChange={handleChange} />
      <input name="industry" placeholder="Industry" onChange={handleChange} />

      <button onClick={generateEmail}>Generate Email</button>

      <p>{message}</p>

      {email && <pre>{email}</pre>}
    </div>
  );
}



const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    background: "#f5f6fa",
    fontFamily: "sans-serif",
    padding: "40px",
    textAlign: "center",
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

  message: {
    textAlign: "center",
    fontWeight: "600",
  },

  emailBox: {
    whiteSpace: "pre-wrap",
    background: "#f9f9f9",
    padding: "15px",
    borderRadius: "8px",
  },

  uploadBox: {
  padding: "20px",
  border: "2px dashed #ccc",
  borderRadius: "10px",
  textAlign: "center",
  cursor: "pointer",
},

  copyBtn: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#00b894",
    color: "#fff",
    cursor: "pointer",
  },

  upgradeBtn: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    background: "linear-gradient(135deg, #ff9f43, #ff6b6b)",
    color: "#fff",
  },
};