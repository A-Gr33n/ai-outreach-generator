import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";


export default function Account() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
  const stored = localStorage.getItem("user");

  if (stored) {
    setUser(JSON.parse(stored));
  } else {
    setUser(null); // don't redirect yet
  }
}, []);

 
    //if (!stored) {
     // router.push("/login");
      //return;
   // }

   if (user === null) {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Please log in</h2>
      <button onClick={() => router.push("/login")}>
        Go to Login
      </button>
    </div>
  );
}

  // Prevent SSR crash
  if (!user) return null;

  const plan = user.plan?.toLowerCase();

  const handleCancel = () => {
    // 🔥 Replace with Stripe portal later
    alert("Redirecting to Stripe to cancel...");

    window.location.href = "billing.stripe.com/p/login/test_eVq8wP6tmbl25090Z05kk00";
  };

  const handleUpgrade = () => {
    router.push("/pricing");
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>Account</h1>

          <p style={styles.text}>
            <strong>Email:</strong> {user.email}
          </p>

          <p style={styles.text}>
            <strong>Plan:</strong>{" "}
            <span style={styles.plan}>{user.plan}</span>
          </p>

          {/* 🔥 ONLY SHOW FOR PAID USERS */}
          {["starter", "pro", "agency"].includes(plan) && (
            <>
              <button style={styles.cancelBtn} onClick={handleCancel}>
                Cancel Subscription
              </button>

              <button style={styles.upgradeBtn} onClick={handleUpgrade}>
                Upgrade Plan
              </button>
            </>
          )}

          {/* 🔥 FREE USER CTA */}
          {plan === "free" && (
            <button style={styles.upgradeBtn} onClick={handleUpgrade}>
              Upgrade to Paid Plan
            </button>
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f5f5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "90%",
    maxWidth: "400px",
  },

  title: {
    fontSize: "28px",
    marginBottom: "20px",
  },

  text: {
    fontSize: "16px",
    marginBottom: "10px",
  },

  plan: {
    background: "#10b981",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    marginLeft: "8px",
  },

  cancelBtn: {
    marginTop: "25px",
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "#ef4444",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },

  upgradeBtn: {
    marginTop: "15px",
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #4b4ded, #6c63ff)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
};