import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!email) return alert("Enter email");

    // ✅ basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return alert("Enter a valid email");
    }

    // ✅ check existing user
    const existing = localStorage.getItem(`user_${email}`);

    let user;

    if (existing) {
      user = JSON.parse(existing);
    } else {
      user = {
        email,
        plan: "free",
        usage: 0,
        resetDate: new Date().toISOString(),
      };

      localStorage.setItem(`user_${email}`, JSON.stringify(user));
    }

    // ✅ set active session
    localStorage.setItem("user", JSON.stringify(user));

    // 🔥 IMPORTANT → trigger navbar update
    window.dispatchEvent(new Event("storage"));

    // ✅ redirect
    router.push("/");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <button style={styles.button} onClick={handleLogin}>
          Continue
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
    background: "#f5f6fa",
  },

  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "300px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  button: {
    marginTop: "20px",
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #4b4ded, #7a5cff)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
};