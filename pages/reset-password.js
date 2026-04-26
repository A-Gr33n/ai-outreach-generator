import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/router";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleUpdate = async () => {
    if (!password || !confirm) {
      return setMessage("❌ Fill in all fields");
    }

    if (password !== confirm) {
      return setMessage("❌ Passwords do not match");
    }

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setMessage("❌ Error updating password");
    } else {
      setMessage("✅ Password updated! Redirecting...");
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Set New Password</h1>

        <p style={styles.subtitle}>
          Enter your new password below.
        </p>

        <div style={styles.card}>
          <input
            type="password"
            placeholder="New password"
            style={styles.input}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm password"
            style={styles.input}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button style={styles.button} onClick={handleUpdate}>
            Update Password
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
          </p>
        )}

        {/* ✅ BACK LINK */}
        <a href="/login" style={styles.backLink}>
          ← Back to Login
        </a>
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