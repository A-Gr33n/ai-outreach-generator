import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Success() {
  const [plan, setPlan] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selectedPlan = params.get("plan");

    if (selectedPlan) {
      localStorage.setItem("plan", selectedPlan);
      setPlan(selectedPlan);
    }
  }, []);

  return (

    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎉 Payment Successful</h1>

        <p style={styles.text}>
          Your subscription has been activated.
        </p>

        {plan && (
          <p style={styles.plan}>
            Current Plan: <strong>{plan.toUpperCase()}</strong>
          </p>
        )}

        <div>
  <Navbar />

  <div style={styles.page}>
    ...
  </div>
</div>

        <Link href="/">
          <button style={styles.button}>
            Go Back to Generator
          </button>
        </Link>
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
    background: "white",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "90%",
    maxWidth: "400px",
  },
  title: {
    fontSize: "28px",
    marginBottom: "15px",
  },
  text: {
    fontSize: "16px",
    marginBottom: "10px",
    color: "#555",
  },
  plan: {
    fontSize: "16px",
    marginBottom: "25px",
  },
  button: {
    background: "linear-gradient(90deg, #5f6afc, #6c63ff)",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
};