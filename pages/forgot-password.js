import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    if (!email) {
      return setMessage("❌ Enter your email");
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password",
    });

    if (error) {
      setMessage("❌ Failed to send reset email");
    } else {
      setMessage("✅ Check your email for reset link");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Reset Password</h1>

        <p style={styles.subtitle}>
          Enter your email and we’ll send you a reset link.
        </p>

        <div style={styles.card}>
          <input
            type="email"
            placeholder="Enter your email"
            style={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button style={styles.button} onClick={handleReset}>
            Send Reset Link
          </button>
        </div>

        
        {message && (
          <p
            style={{
              ...styles.message,
              color: message.includes("❌") ? "red" : "green",
            }}
          >
            {message}

            <a href="/login" style={{ textAlign: "center", fontSize: "14px" }}>
         ← Back to Login
        </a>

          </p>
        )}
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
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    fontSize: "14px",
    color: "#666",
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
  message: {
    textAlign: "center",
    fontWeight: "600",
  },

  backLink: {
  textAlign: "center",
  fontSize: "14px",
  color: "#6c63ff",
  textDecoration: "none",
  marginTop: "10px",
},
};