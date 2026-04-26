import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    if (!email) {
      return setMessage("❌ Enter your email");
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://aisalesoutreach.vercel.app//reset-password",
    });

    if (error) {
      setMessage("❌ Error sending reset email");
    } else {
      setMessage("✅ Check your email for reset link");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleReset}>Send Reset Link</button>

      <p>{message}</p>
    </div>
  );
}