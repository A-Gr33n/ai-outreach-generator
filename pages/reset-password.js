import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/router";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleUpdate = async () => {
    if (!password) {
      return setMessage("❌ Enter new password");
    }

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setMessage("❌ Error updating password");
    } else {
      setMessage("✅ Password updated");
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="New password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleUpdate}>Update Password</button>

      <p>{message}</p>
    </div>
  );
}