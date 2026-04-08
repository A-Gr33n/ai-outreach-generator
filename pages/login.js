import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const router = useRouter();

const handleLogin = () => {
  if (!email) return alert("Enter email");

  // 🔥 CHECK IF USER EXISTS
  const existing = localStorage.getItem(`user_${email}`);

  let user;

  if (existing) {
    // ✅ RETURNING USER → KEEP DATA
    user = JSON.parse(existing);
  } else {
    // ✅ NEW USER → CREATE
    user = {
      email,
      plan: "free",
      usage: 0,
      resetDate: new Date().toISOString(),
    };

    // 🔥 SAVE USER DATABASE
    localStorage.setItem(`user_${email}`, JSON.stringify(user));
  }

  // 🔥 SET ACTIVE SESSION
  localStorage.setItem("user", JSON.stringify(user));

  // 🔥 UPDATE NAVBAR
  window.dispatchEvent(new Event("storage"));

  router.push("/");
};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Login / Register</h1>

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
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
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    textAlign: "center",
  },
  input: {
    padding: "12px",
    width: "250px",
    marginTop: "20px",
  },
  button: {
    marginTop: "20px",
    padding: "12px",
    background: "#4b4ded",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};