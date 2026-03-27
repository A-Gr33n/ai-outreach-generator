import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    website: "",
    industry: "",
  });

  const [csvFile, setCsvFile] = useState(null);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const router = useRouter();

  // LOAD USER
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const plan = user?.plan || "free";

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SINGLE GENERATE
  const generateEmail = () => {
    if (!user) {
      alert("Login required");
      router.push("/login");
      return;
    }

    alert("Email generated!");
  };

  // CSV UPLOAD
  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
    setMessage(`Uploaded: ${file?.name}`);
  };

  // BULK GENERATE
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

          {/* FORM CARD */}
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

            <button style={styles.primaryBtn} onClick={generateEmail}>
              Generate Email
            </button>
          </div>

          {/* BULK CARD */}
          <div style={styles.card}>
            <h2 style={styles.bulkTitle}>📂 Bulk Generate (CSV)</h2>

            <p style={styles.bulkSubtitle}>
              Upload a CSV file to generate multiple emails instantly
            </p>

            {/* Upload */}
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

            {/* File name */}
            {csvFile && (
              <p style={styles.fileName}>📄 {csvFile.name}</p>
            )}

            {/* Button */}
            <button
              style={{
                ...styles.bulkBtn,
                opacity: plan === "free" || plan === "starter" ? 0.5 : 1,
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

            {/* STATUS */}
            {message && <p style={styles.message}>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------- STYLES ----------------

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: "url('/background.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    width: "100%",
    minHeight: "100vh",
    background: "rgba(255,255,255,0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  container: {
    width: "100%",
    maxWidth: "520px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  title: {
    fontSize: "32px",
    textAlign: "center",
  },

  planBox: {
    width: "100%",
    background: "#e3e8ff",
    padding: "12px",
    borderRadius: "8px",
    textAlign: "center",
  },

  card: {
    width: "100%",
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

input: {
  width: "80%",        // 👈 smaller width
  margin: "0 auto",    // 👈 centers horizontally
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  textAlign: "center",
},
primaryBtn: {
  width: "80%",        // 👈 match input width
  margin: "0 auto",    // 👈 center it
  padding: "14px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(135deg, #4b4ded, #7a5cff)",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
},

  bulkBtn: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #00c9a7, #00b894)",
    color: "#fff",
    fontWeight: "600",
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
};