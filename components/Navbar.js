import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {

    const loadUser = () => {
    const stored = localStorage.getItem("user");
    setUser(stored ? JSON.parse(stored) : null);
  };
  
   loadUser();

    window.addEventListener("storage", loadUser);

  return () => window.removeEventListener("storage", loadUser);
}, []);

 const handleLogout = () => {
  localStorage.removeItem("user");

  // 🔥 trigger UI update
  window.dispatchEvent(new Event("storage"));

  setUser(null);

  router.push("/login");
};

  

  return (
    <div style={styles.nav}>
      <h2 style={styles.logo}>AI Outreach</h2>

      <div style={styles.links}>
        <button style={styles.navBtn} onClick={() => router.push("/")}>
          Home
        </button>

        <button style={styles.navBtn} onClick={() => router.push("/pricing")}>
          Pricing
        </button>

        <button style={styles.navBtn} onClick={() => router.push("/how-to-use")}>
          How to use
        </button>

        {user && (
          <button style={styles.navBtn} onClick={() => router.push("/account")}>
            Account
          </button>
        )}

        {!user ? (
          <button style={styles.loginBtn} onClick={() => router.push("/login")}>
            Login
          </button>
        ) : (
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  nav: {
    width: "100%",
    padding: "15px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    borderBottom: "1px solid #eee",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  logo: {
    margin: 0,
    fontWeight: "700",
    color: "#333",
  },

  links: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },

  navBtn: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    fontWeight: "500",
    transition: "0.2s",
  },

  loginBtn: {
    padding: "10px 18px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #4b4ded, #6c63ff)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },

  logoutBtn: {
    padding: "10px 18px",
    borderRadius: "10px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
};