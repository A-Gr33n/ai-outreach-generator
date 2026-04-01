import { useEffect, useState } from "react";
import { useRouter } from "next/router";


export default function Account() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      router.push("/login");
    } else {
      setUser(JSON.parse(stored));
    }
  }, []);

  if (!user) return null;

  <button
  onClick={async () => {
    await fetch("http://localhost:5000/api/cancel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email }),
    });

    alert("Subscription cancelled");
  }}
>
  Cancel Subscription
</button>

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.container}>
          <h1 style={styles.title}>My Account</h1>

          <div style={styles.card}>
            {/* USER INFO */}
            <div style={styles.info}>
              <p><strong>Email:</strong> {user.email}</p>
              <p>
                <strong>Plan:</strong>{" "}
                <span style={styles.planBadge}>
                  {user.plan.toUpperCase()}
                </span>
              </p>
            </div>

            {/* ACTIONS */}
            <div style={styles.actions}>
              <button
                style={styles.primaryBtn}
                onClick={() => router.push("/pricing")}
              >
                Manage Subscription
              </button>

              

              <button
                style={styles.logoutBtn}
                onClick={() => {
                  localStorage.removeItem("user");
                  router.push("/");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------- STYLES ----------------

const styles = {
  page: {
    minHeight: "30vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  overlay: {
    width: "100%",
    minHeight: "100vh",
    background: "rgba(255,255,255,0.85)",
    display: "flex",
    flexDirection: "column", // ✅ important
    alignItems: "center",
    paddingTop: "80px", // ✅ pushes title down from very top
  },

  container: {
    width: "100%",
    maxWidth: "500px",
    marginTop: "40px", // ✅ space between title and card
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    alignItems: "center",
  },

  title: {
    fontSize: "32px",
    textAlign: "center",
  },

  card: {
    width: "100%", // ✅ ensures proper centering
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },

  info: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  planBadge: {
    background: "#4b4ded",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    marginLeft: "5px",
  },

  actions: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  primaryBtn: {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #4b4ded, #7a5cff)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },

  logoutBtn: {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "#ff4d4d",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
};