import { useEffect, useState } from "react";

export default function Account() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  // ✅ Prevent crash during build
  if (!user) {
    return <p style={{ padding: "40px" }}>Loading account...</p>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Account</h1>

      <p><strong>Email:</strong> {user.email || "Not set"}</p>
      <p><strong>Plan:</strong> {user.plan}</p>
       
      {user.plan !== "free" && (
        <button
          onClick={() =>
            window.location.href = "/pricing"
          }
        >
         Manage Subscription
        </button>
      )}
      
      {user.plan !== "free" && (
        <button
          onClick={() =>
            window.location.href = "https://billing.stripe.com/p/login/test_eVq8wP6tmbl25090Z05kk00"
          }
        >
         Cancel Subscription
        </button>
      )}
    </div>
  );
}