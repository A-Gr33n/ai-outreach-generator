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
  <div style={styles.container}></div>
<div style={styles.card}>
  <h1 style={styles.title}>Login</h1>

  <input
    type="email"
    placeholder="Enter your email"
    style={styles.input}
    onChange={(e) => setEmail(e.target.value)}
  />

  <input
    type="password"
    placeholder="Password"
    style={styles.input}
    onChange={(e) => setPassword(e.target.value)}
  />

  {/* ✅ BETTER POSITION */}
  <div style={styles.forgotWrapper}>
    <a href="/forgot-password" style={styles.forgotLink}>
      Forgot Password?
    </a>
  </div>

  <button style={styles.button} onClick={handleLogin}>
    Login
  </button>

  <p style={styles.footerText}>
    Don't have an account?{" "}
    <a href="/signup" style={styles.link}>
      Sign up
    </a>
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

  forgotWrapper: {
  width: "100%",
  textAlign: "right",
  marginTop: "-8px",
},

forgotLink: {
  fontSize: "13px",
  color: "#6c63ff",
  textDecoration: "none",
  fontWeight: "500",
},

footerText: {
  textAlign: "center",
  marginTop: "10px",
},

link: {
  color: "#6c63ff",
  fontWeight: "600",
  textDecoration: "none",
},

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
},

};