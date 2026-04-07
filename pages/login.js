import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!email) return alert("Enter email");

    let user = JSON.parse(localStorage.getItem("user"));

    // ✅ SAME USER → KEEP DATA
    if (user && user.email === email) {
      // keep existing
    } else {
      // ✅ NEW USER
      user = {
        email,
        plan: "free",
        usage: 0,
        resetDate: new Date().toISOString(),
        customerId: null,
      };
    }

   localStorage.setItem("user", JSON.stringify(user));

// 🔥 ADD THIS LINE
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