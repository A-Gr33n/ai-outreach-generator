import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  

  const handleLogin = async () => {
    if (!email) return alert("Enter email and password");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return alert("Enter a valid email");
    }

    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "https://aioutreachgenerator.vercel.app/account",
      },
    });

    

    if (error) {
      console.error(error);
      alert("Error sending login email");
    } else {
      alert("Check your email to login 🚀");
          router.push("/account"); 
    }
  };

  const [password, setPassword] = useState(""); // Add this at the top with your email state
 

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