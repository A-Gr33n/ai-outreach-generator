import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    if (!email || !password) {
      return alert("Enter email and password");
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Account created! Please login.");
      router.push("/login"); // 🔥 redirect to login
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>Sign Up</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleSignup} style={styles.button}>
          Create Account
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
    width: "300px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
  },
  button: {
    marginTop: "20px",
    width: "100%",
    padding: "12px",
  },
};