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
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  // ✅ PLAN LIMITS
  const getLimit = (plan) => {
    if (plan === "free") return 3;
    if (plan === "starter") return 100;
    if (plan === "pro") return 1000;
    return 0;
  };

  // ✅ LOAD USER + RESET MONTHLY
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return;

    let userData = JSON.parse(stored);

    const now = new Date();
    const resetDate = new Date(userData.resetDate || now);

    // 🔥 Reset every new month
    if (
      now.getMonth() !== resetDate.getMonth() ||
      now.getFullYear() !== resetDate.getFullYear()
    ) {
      userData.usage = 0;
      userData.resetDate = now.toISOString();
      localStorage.setItem("user", JSON.stringify(userData));
    }

    setUser(userData);
  }, []);

  const plan = user?.plan || "free";
  const usage = user?.usage || 0;
  const limit = getLimit(plan);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ MAIN GENERATE FUNCTION
  const generateEmail = async () => {
    if (!user) {
      alert("Please login first");
      return router.push("/login");
    }

    // 🔥 LIMIT CHECK
    if (usage >= limit) {
      setMessage(`❌ Limit reached (${limit} emails/month)`);
      return;
    }

    try {
      setMessage("⏳ Generating...");

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.email) throw new Error("No email returned");

      setEmail(data.email);

      // 🔥 UPDATE USAGE
      const updatedUser = {
        ...user,
        usage: usage + 1,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setMessage("✅ Email generated");

    } catch (err) {
      console.error(err);
      setMessage("❌ Error generating email");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>AI Sales Outreach</h1>

        {/* ✅ USAGE DISPLAY */}
        <p style={{ textAlign: "center" }}>
          Usage: {usage} / {limit}
        </p>

        <div style={styles.planBox}>
          <strong>Plan:</strong> {plan.toUpperCase()}
        </div>

        {/* FORM */}
        <div style={styles.card}>
          <input
            name="name"
            placeholder="Name"
            style={styles.input}
            onChange={handleChange}
          />
          <input
            name="company"
            placeholder="Company"
            style={styles.input}
            onChange={handleChange}
          />
          <input
            name="website"
            placeholder="Website"
            style={styles.input}
            onChange={handleChange}
          />
          <input
            name="industry"
            placeholder="Industry"
            style={styles.input}
            onChange={handleChange}
          />

          <button style={styles.button} onClick={generateEmail}>
            Generate Email
          </button>
        </div>

        {/* MESSAGE */}
        {message && (
          <p style={styles.message}>
            {message}
          </p>
        )}

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

        {/* 🔥 UPGRADE CTA */}
        {usage >= limit && (
          <button
            style={styles.upgradeBtn}
            onClick={() => router.push("/pricing")}
          >
            🚀 Upgrade Plan
          </button>
        )}
      </div>
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