import { useEffect, useState } from "react";

export default function Account() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  if (!user) {
    return <p style={styles.loading}>Loading account...</p>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Account</h1>

        <div style={styles.info}>
          <p>
            <strong>Email:</strong> {user.email || "Not set"}
          </p>

          <p>
            <strong>Plan:</strong>
            <span style={styles.planBadge(user.plan)}>
              {user.plan.toUpperCase()}
            </span>
          </p>
        </div>

        {/* ACTIONS */}
        <div style={styles.actions}>
          {user.plan !== "free" && (
            <button
              style={styles.manageBtn}
              onClick={() =>
                window.open(
                  "https://billing.stripe.com/p/login/test_eVq8wP6tmbl25090Z05kk00"
                )
              }
            >
              Manage Subscription
            </button>
          )}

          {user.plan === "free" && (
            <button
              style={styles.upgradeBtn}
              onClick={() => (window.location.href = "/pricing")}
            >
              Upgrade Plan
            </button>
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
    background: "#f5f7fb",
    padding: "20px",
  },

  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
    width: "100%",
    maxWidth: "450px",
    textAlign: "center",
  },

  title: {
    fontSize: "28px",
    marginBottom: "20px",
  },

  info: {
    textAlign: "left",
    marginBottom: "30px",
    lineHeight: "1.8",
    fontSize: "16px",
  },

  planBadge: (plan) => ({
    marginLeft: "10px",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#fff",
    background:
      plan === "pro"
        ? "#4b4ded"
        : plan === "starter"
        ? "#00b894"
        : plan === "agency"
        ? "#6c5ce7"
        : "#999",
  }),

  actions: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  manageBtn: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #ff7675, #d63031)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "15px",
  },

  upgradeBtn: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #4b4ded, #6c63ff)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "15px",
  },

  loading: {
    textAlign: "center",
    padding: "50px",
    fontSize: "18px",
  },
};