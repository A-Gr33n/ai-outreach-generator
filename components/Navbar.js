import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

useEffect(() => {
  const handleStorage = () => {
    const stored = localStorage.getItem("user");
    setUser(stored ? JSON.parse(stored) : null);
  };

  window.addEventListener("storage", handleStorage);

  return () => window.removeEventListener("storage", handleStorage);
}, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); // 🔥 THIS FIXES UI
    router.push("/login");
  };

  return (
    <div style={styles.nav}>
      <h2 style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
        AI Outreach
      </h2>

      <div style={styles.links}>
        <button onClick={() => router.push("/")}>Home</button>
        <button onClick={() => router.push("/pricing")}>Pricing</button>
        <button onClick={() => router.push("/how-to-use")}>How to use</button>
        <button onClick={() => router.push("/account")}>Account</button>

        {/* 🔥 CONDITIONAL BUTTON */}
        {user ? (
          <button style={styles.logout} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button
            style={styles.login}
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}

