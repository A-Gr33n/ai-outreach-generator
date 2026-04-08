import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    if (!email) return alert("Enter email");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

  
    if (error) {
      setMessage("❌ Error sending email");
    } else {
      setMessage("✅ Check your email for login link");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Enter real email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>Send Magic Link</button>

      <p>{message}</p>
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