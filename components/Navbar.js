import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // ✅ LOAD USER + LISTEN FOR CHANGES
  useEffect(() => {
    const loadUser = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    };

    loadUser();

    // 🔥 KEY FIX: listen for updates
    window.addEventListener("storage", loadUser);
    window.addEventListener("focus", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("focus", loadUser);
    };
  }, []);

  // ✅ LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);

    // 🔥 force UI update across app
    window.dispatchEvent(new Event("storage"));

    router.push("/login");
  };

  return (
    <div style={styles.nav}>
      <h2 style={styles.logo}>AI Outreach</h2>

      <div style={styles.links}>
        <button onClick={() => router.push("/")}>Home</button>
        <button onClick={() => router.push("/pricing")}>Pricing</button>
        <button onClick={() => router.push("/how-to-use")}>How to use</button>
        <button onClick={() => router.push("/account")}>Account</button>

        {/* 🔥 CONDITIONAL BUTTON */}
        {user ? (
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button style={styles.loginBtn} onClick={() => router.push("/login")}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#fff",
    borderBottom: "1px solid #eee",
  },

  logo: {
    fontWeight: "700",
  },

  links: {
    display: "flex",
    gap: "10px",
  },

  loginBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    background: "#4b4ded",
    color: "#fff",
    cursor: "pointer",
  },

  logoutBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    cursor: "pointer",
  },
};