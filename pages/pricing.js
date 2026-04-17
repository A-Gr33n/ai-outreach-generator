import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Pricing() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false); // 👈 prevent flicker

 useEffect(() => {
  const checkUser = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      router.push("/login");
    }
  };

  checkUser();
}, []);


  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      alert("Please login to view pricing");
      router.push("/login");
    } else {
      setUser(JSON.parse(stored));
    }

    setChecked(true);
  }, []);

  // ⛔ prevent render before check finishes
  if (!checked) return null;

  // ⛔ block page if not logged in
  if (!user) return null;

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

          <button
            style={styles.btn}
            onClick={() =>
              (window.location.href =
                "https://buy.stripe.com/test_3cI00j7xq88QboxbDE5kk01")
            }
          >
            Upgrade to STARTER
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

          <button
            style={styles.btn}
            onClick={() =>
              (window.location.href =
                "https://buy.stripe.com/test_bJe4gz1924WE2S1dLM5kk02")
            }
          >
            Upgrade to PRO
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

          <button
            style={styles.btn}
            onClick={() =>
              (window.location.href =
                "https://buy.stripe.com/test_fZu6oH9Fy3SAfEN2345kk03")
            }
          >
            Upgrade to AGENCY
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
};