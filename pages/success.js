import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Success() {
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      const updatedUser = {
        ...user,
        plan: "starter",
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>🎉 Payment Successful</h1>
        <p>Your subscription has been activated.</p>
        <p><strong>Current Plan: STARTER</strong></p>

        <button
          style={styles.button}
          onClick={() => router.push("/")}
        >
          Go Back to Generator
        </button>
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
    background: "#f5f5f5",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
  },
  button: {
    marginTop: "20px",
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(90deg, #5f6afc, #6c63ff)",
    color: "#fff",
    cursor: "pointer",
  },
};