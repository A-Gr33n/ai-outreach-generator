import { useState } from "react";
import { useRouter } from "next/router";


export default function Login() {
  const [email, setEmail] = useState("");
  const router = useRouter();

const handleLogin = () => {
  if (!email) {
    alert("Enter email");
    return;
  }

  const user = {
    email,
    plan: "free",
  };

  localStorage.setItem("user", JSON.stringify(user));

  // ✅ FORCE UI UPDATE
  window.location.href = "/";
};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login / Register</h2>

        <input
          placeholder="Email"
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          Continue
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "60vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url('/background.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  overlay: {
    width: "100%",
    minHeight: "100vh",
    background: "rgba(255,255,255,0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "30px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // ✅ centers children
    gap: "15px",
  },

  title: {
    fontSize: "24px",
    marginBottom: "10px",
  },

  input: {
    width: "80%",              // ✅ smaller width
    margin: "0 auto",          // ✅ centered
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    textAlign: "center",       // ✅ centered text
  },

  button: {
    width: "80%",              // ✅ matches input
    margin: "0 auto",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #4b4ded, #7a5cff)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
};