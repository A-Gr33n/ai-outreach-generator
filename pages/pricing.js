import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Pricing() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleUpgrade = (plan) => {
    if (!user) {
      alert("⚠️ Please login first");
      router.push("/login");
      return;
    }

    const updatedUser = { ...user, plan };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert(`✅ Upgraded to ${plan}`);
    router.push("/");
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Pricing Plans</h1>

      <div style={styles.grid}>
        {/* FREE */}
        <div style={styles.card}>
          <h2>Free Demo</h2>
          <h3>£0</h3>

          <ul>
            <li>First 3 generators free</li>
            <li>AI generated outreach email</li>
            <li>Test the product</li>
          </ul>

          <button style={styles.btn} onClick={() => router.push("/")}>
            Start Free
          </button>
        </div>

        {/* STARTER */}
        <div style={styles.card}>
          <h2>Starter</h2>
          <h3>£19 / month</h3>

          <ul>
            <li>100 email generations</li>
            <li>AI company research</li>
            <li>Email copy & export</li>
          </ul>

          <button style={styles.btn} onClick={() => handleUpgrade("starter")}>
            Upgrade
          </button>
        </div>

        {/* PRO */}
        <div style={styles.cardHighlight}>
          <h2>Pro</h2>
          <h3>£49 / month</h3>

          <ul>
            <li>Unlimited generators</li>
            <li>Bulk CSV email generator</li>
            <li>Campaign downloads</li>
          </ul>

          <button style={styles.btnPrimary} onClick={() => handleUpgrade("pro")}>
            Upgrade
          </button>
        </div>

        {/* AGENCY */}
        <div style={styles.card}>
          <h2>Agency</h2>
          <h3>£99 / month</h3>

          <ul>
            <li>Unlimited campaigns</li>
            <li>Bulk lead outreach</li>
            <li>Team usage</li>
          </ul>

          <button style={styles.btn} onClick={() => handleUpgrade("agency")}>
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "60px 20px",
    textAlign: "center",
  },

  title: {
    fontSize: "36px",
    marginBottom: "40px",
  },

  grid: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },

  card: {
    width: "250px",
    padding: "25px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  cardHighlight: {
    width: "250px",
    padding: "25px",
    borderRadius: "12px",
    background: "#4b4ded",
    color: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    transform: "scale(1.05)",
  },

  btn: {
    marginTop: "20px",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "#eee",
    cursor: "pointer",
  },

  btnPrimary: {
    marginTop: "20px",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "#fff",
    color: "#4b4ded",
    fontWeight: "600",
    cursor: "pointer",
  },
};