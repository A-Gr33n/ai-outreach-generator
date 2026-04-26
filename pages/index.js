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
  const [generatedEmails, setGeneratedEmails] = useState([]); // ✅ moved here

  // ✅ LOAD USER FROM DB
  useEffect(() => {
    const loadUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) return;

      const { data: profile } = await supabase
        .from("users")
        .select("plan, usage")
        .eq("id", data.user.id)
        .single();

      setUser({
        id: data.user.id,
        email: data.user.email,
        plan: profile?.plan || "free",
        usage: profile?.usage || 0,
      });
    };

    loadUser();
  }, []);

  // ✅ KEEP USER LOGGED IN (fix Stripe redirect logout)
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser((prev) => ({
            ...prev,
            id: session.user.id,
            email: session.user.email,
          }));
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

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

  // ✅ SINGLE EMAIL
  const generateEmail = async () => {
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

  // ✅ BULK GENERATE (FIXED)
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
        body: JSON.stringify({
          leads,
          product: "AI Outreach Tool", // ✅ add your product
          userId: user.id,            // ✅ REQUIRED
          campaignName: "Campaign 1", // ✅ REQUIRED
        }),
      });

      const data = await res.json();

      setGeneratedEmails(data.results);
      setMessage("✅ Bulk emails generated");
    } catch (err) {
      console.error(err);
      setMessage("❌ Bulk generation failed");
    }
  };

  // ✅ DOWNLOAD CSV
  const downloadCSV = () => {
    if (!generatedEmails.length) return;

    const headers = Object.keys(generatedEmails[0]).join(",");
    const rows = generatedEmails.map((obj) =>
      Object.values(obj).map((v) => `"${v}"`).join(",")
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
          <p style={{ ...styles.message, color: message.includes("❌") ? "red" : "green" }}>
            {message}
          </p>
        )}

        {/* SINGLE OUTPUT */}
        {email && (
          <div style={styles.card}>
            <h3>Generated Email</h3>
            <pre style={styles.emailBox}>{email}</pre>
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
            style={styles.button}
            disabled={plan === "free" || plan === "starter"}
            onClick={handleBulkGenerate}
          >
            Generate From CSV
          </button>

          {/* 🔥 SHOW RESULTS */}
          {generatedEmails.length > 0 && (
            <div>
              <h3>Bulk Results</h3>
              {generatedEmails.map((e, i) => (
                <div key={i} style={styles.card}>
                  <strong>{e.name}</strong>
                  <pre style={styles.emailBox}>{e.email}</pre>
                </div>
              ))}

              <button style={styles.button} onClick={downloadCSV}>
                📥 Download CSV
              </button>
            </div>
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
  message: {
    textAlign: "center",
    fontWeight: "600",
  },
};