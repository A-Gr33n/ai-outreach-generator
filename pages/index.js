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
  const [usage, setUsage] = useState(0);
  const [csvFile, setCsvFile] = useState(null);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const router = useRouter();

  // Load user
  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) setUser(JSON.parse(storedUser));

  const storedUsage = localStorage.getItem("usage");
  if (storedUsage) setUsage(Number(storedUsage));
}, []);

  const plan = user?.plan || "free";

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateEmail = async () => {
  if (!user) {
    alert("Login required");
    router.push("/login");
    return;
  }

  // 🔒 FREE PLAN LIMIT
  if (user.plan === "free" && usage >= 5) {
    setMessage("❌ Free limit reached (5 emails). Upgrade to continue.");
    return;
  }

  try {
    setMessage("⏳ Generating email...");

    const res = await fetch("http://localhost:5000/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!data.emails || data.emails.length === 0) {
      setMessage("❌ No email returned");
      return;
    }

    const randomEmail =
      data.emails[Math.floor(Math.random() * data.emails.length)];

    setEmail(randomEmail);

    // ✅ INCREMENT USAGE
    const newUsage = usage + 1;
    setUsage(newUsage);
    localStorage.setItem("usage", newUsage);

    setMessage("✅ Email generated!");

  } catch (err) {
    console.error(err);
    setMessage("❌ Error generating email");
  }
};

  // Upload CSV
  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
    setMessage(`Uploaded: ${file?.name}`);
  };

  // Bulk generate
  const handleBulkGenerate = () => {
    if (!user) {
      alert("Login required");
      router.push("/login");
      return;
    }

    if (plan !== "pro" && plan !== "agency") {
      alert("Upgrade to PRO to use bulk features");
      return;
    }

    setMessage("⏳ Generating emails...");

    setTimeout(() => {
      setMessage("✅ Emails generated & ready to download!");
    }, 1500);
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.container}>
          <h1 style={styles.title}>AI Sales Outreach Generator</h1>

          {/* PLAN */}
          <div style={styles.planBox}>
            <strong>Current Plan:</strong> {plan.toUpperCase()}
          </div>
          
          {user?.plan === "free" && (
          <div style={styles.usageBox}>
            Free Plan: {usage}/5 emails used
          </div>
            )}

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

            {email && (
  <div style={styles.outputBox}>
    <h3>Generated Email</h3> 

    <pre style={{ whiteSpace: "pre-wrap" }}>
  {email}
</pre>

    <textarea
      value={email}
      readOnly
      rows={10}
      style={styles.output}
    />
  </div>
)}

<button onClick={() => navigator.clipboard.writeText(email)}>
  Copy Email
</button>
            
          </div>

          {/* BULK */}
          <div style={styles.card}>
            <h2 style={styles.bulkTitle}>📂 Bulk Generate (CSV)</h2>

            <p style={styles.bulkSubtitle}>
              Upload a CSV file to generate multiple emails instantly
            </p>

            <label style={styles.uploadBox}>
              <input
                type="file"
                accept=".csv"
                onChange={handleCSVUpload}
                style={{ display: "none" }}
              />
              <div>
                <p style={{ fontWeight: "600" }}>Click to upload CSV</p>
                <span style={{ fontSize: "13px", color: "#777" }}>
                  or drag and drop
                </span>
              </div>
            </label>

            {csvFile && (
              <p style={styles.fileName}>📄 {csvFile.name}</p>
            )}

            <button
              style={{
                ...styles.button,
                background:
                  plan === "free" || plan === "starter"
                    ? "#ccc"
                    : "linear-gradient(135deg, #00c9a7, #00b894)",
                cursor:
                  plan === "free" || plan === "starter"
                    ? "not-allowed"
                    : "pointer",
              }}
              disabled={plan === "free" || plan === "starter"}
              onClick={handleBulkGenerate}
            >
              Generate Emails From CSV
            </button>

            {(plan === "free" || plan === "starter") && (
              <p style={styles.lockText}>
                🔒 Available on PRO & AGENCY plans
              </p>
            )}
          </div>

          {/* MESSAGE */}
          {message && <p style={styles.message}>{message}</p>}
        </div>
      </div>
    </div>
  );
}

// ---------------- STYLES ----------------

const styles = {
  page: {
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  overlay: {
    width: "100%",
    minHeight: "100vh",
    background: "rgba(255,255,255,0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "100%",
    maxWidth: "520px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  title: {
    textAlign: "center",
    fontSize: "32px",
  },

  planBox: {
    background: "#e3e8ff",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
  },

  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "center",
  },

  input: {
    width: "80%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    textAlign: "center",
  },

  button: {
    width: "80%",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #4b4ded, #7a5cff)",
    color: "#fff",
    fontWeight: "600",
  },

  output: {
    width: "80%",
    marginTop: "10px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  bulkTitle: {
    textAlign: "center",
  },

  bulkSubtitle: {
    textAlign: "center",
    fontSize: "14px",
    color: "#666",
  },

  uploadBox: {
    border: "2px dashed #bbb",
    borderRadius: "12px",
    padding: "25px",
    textAlign: "center",
    cursor: "pointer",
    width: "80%",
  },

  fileName: {
    textAlign: "center",
  },

  lockText: {
    textAlign: "center",
    fontSize: "13px",
    color: "#888",
  },

  message: {
    textAlign: "center",
    fontWeight: "500",
  },

  outputBox: {
  width: "100%",
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
},

output: {
  width: "100%",
  marginTop: "10px",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  resize: "none",
},

usageBox: {
  background: "#fff3cd",
  padding: "10px",
  borderRadius: "8px",
  textAlign: "center",
  fontSize: "14px",
},
};