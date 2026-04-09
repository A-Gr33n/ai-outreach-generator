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

  // ✅ PLAN LIMITS
  const getLimit = (plan) => {
    if (plan === "free") return 3;
    if (plan === "starter") return 100;
    if (plan === "pro") return 1000;
    if (plan === "agency") return Infinity;
    return 3;
  };

  // ✅ LOAD USER (SUPABASE + LOCAL STORAGE)
  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data?.user) {
        const email = data.user.email;

        // 🔥 load saved user data
        const stored = localStorage.getItem(`user_${email}`);
        let userData = stored
          ? JSON.parse(stored)
          : {
              email,
              plan: "free",
              usage: 0,
              resetDate: new Date().toISOString(),
            };

        // 🔥 RESET MONTHLY
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

        // 🔥 SAVE BACK
        localStorage.setItem(`user_${email}`, JSON.stringify(userData));
        localStorage.setItem("user", JSON.stringify(userData));
      }
    };

    loadUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ GENERATE EMAIL
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

      // ✅ update usage
      const updatedUser = {
        ...user,
        usage: (user.usage || 0) + 1,
      };

      setUser(updatedUser);

      // 🔥 SAVE PER USER
      localStorage.setItem(`user_${updatedUser.email}`, JSON.stringify(updatedUser));
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setMessage("✅ Email generated");
    } catch {
      setMessage("❌ Error generating email");
    }
  };

  // ✅ BULK
  const handleBulkGenerate = () => {
    if (!user) return router.push("/login");

    if (user.plan === "free" || user.plan === "starter") {
      return alert("Upgrade to PRO to use Bulk Generator");
    }

    if (!csvFile) return alert("Upload CSV first");

    alert("Bulk generation started 🚀");
  };

  const plan = user?.plan || "free";
  const usage = user?.usage || 0;
  const limit = getLimit(plan);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>AI Sales Outreach</h1>

        {/* ✅ USAGE */}
        <p style={styles.usage}>
          Usage: {usage} / {limit === Infinity ? "∞" : limit}
        </p>

        {/* ✅ PLAN */}
        <div style={styles.planBox}>
          <strong>Plan:</strong> {plan.toUpperCase()}
        </div>

        {/* ✅ FORM */}
        <div style={styles.card}>
          <input name="name" placeholder="Name" style={styles.input} onChange={handleChange} />
          <input name="company" placeholder="Company" style={styles.input} onChange={handleChange} />
          <input name="website" placeholder="Website" style={styles.input} onChange={handleChange} />
          <input name="industry" placeholder="Industry" style={styles.input} onChange={handleChange} />

          <button style={styles.button} onClick={generateEmail}>
            Generate Email
          </button>
        </div>

        {/* ✅ MESSAGE */}
        {message && (
          <p style={{ ...styles.message, color: message.includes("❌") ? "red" : "green" }}>
            {message}
          </p>
        )}

        {/* ✅ OUTPUT */}
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

        {/* ✅ BULK SECTION */}
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
  nav: {
    width: "100%",
    padding: "15px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    borderBottom: "1px solid #eee",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  logo: {
    margin: 0,
    fontWeight: "700",
    color: "#333",
  },

  links: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },

 navBtn: {
  padding: "10px 16px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
  fontWeight: "500",
  transition: "0.2s",
},

  loginBtn: {
    padding: "10px 18px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #4b4ded, #6c63ff)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },

  logoutBtn: {
    padding: "10px 18px",
    borderRadius: "10px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
};