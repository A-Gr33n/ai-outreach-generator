import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  
  const [password, setPassword] = useState(""); // Add this at the top with your email state
  
const handleLogin = async () => {
  if (!email || !password) {
    return alert("Enter email and password");
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    alert("Invalid email or password");
  } else {
    alert("Logged in successfully 🚀");
    router.push("/account");
  }
};

  const handleSignup = async () => {
  if (!email || !password) {
    return alert("Enter email and password");
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error(error);
    alert(error.message);
  } else {
    alert("Account created! You can now log in.");
  }
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

          <input
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login 
        </button>
      <p style={{ marginTop: "15px" }}>
      Don't have an account?{" "}
      <span
      style={{ color: "blue", cursor: "pointer" }}
      onClick={() => router.push("/signup")}
  >
    Sign up
  </span>

  <Link href="/forgot-password">
  Forgot Password?
</Link>
</p>
      
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