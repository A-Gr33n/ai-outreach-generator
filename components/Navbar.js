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

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    background: "#fff",
    borderBottom: "1px solid #eee",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  links: {
    display: "flex",
    gap: "12px",
  },

  btn: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
  },

  btnPrimary: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #4b4ded, #6c63ff)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },

  btnDanger: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#ff4d4f",
    color: "#fff",
    cursor: "pointer",
  },
};


