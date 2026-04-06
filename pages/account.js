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




   if (user === null) {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Please log in</h2>
     
     <button style={styles.loginBtn} onClick={() => router.push("/login")}>
  Go to Login
    </button>


    </div>
  );
}

  // Prevent SSR crash
  if (!user) return null;

  const plan = user.plan?.toLowerCase();

const handleManageSubscription = async () => {
  try {
    const res = await fetch("/api/customer-portal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId: "cus_UGzeYXBmFkD5jm", // ✅ your Stripe customer ID
      }),
    });

    const data = await res.json();

    console.log("API RESPONSE:", data);

    if (data.url) {
      window.location.href = data.url; // ✅ redirect to Stripe
    } else {
      alert("No portal URL returned");
    }

  } catch (err) {
    console.error(err);
    alert("Error opening billing portal");
  }
};

  const handleUpgrade = () => {
    router.push("/pricing");
  };



  return (
    <>
      

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

          <button style={styles.manageBtn} onClick={handleManageSubscription}>
           Manage Subscription
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

  loginBtn: {
  marginTop: "20px",
  padding: "12px 20px",
  border: "none",
  borderRadius: "8px",
  background: "linear-gradient(135deg, #4b4ded, #6c63ff)",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
},

  manageBtn: {
    marginTop: "20px",
    width: "100%",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "#fff",
    cursor: "pointer",
    fontWeight: "500",
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