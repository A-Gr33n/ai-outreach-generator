import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

useEffect(() => {
  const stored = localStorage.getItem("user");
  if (stored) {
    setUser(JSON.parse(stored));
  } else {
    setUser(null);
  }
}, []);

 const handleLogout = () => {
  localStorage.removeItem("user");
  setUser(null); // 🔥 FORCE UI UPDATE
  router.push("/login");
};

  return (
    <div style={styles.nav}>
      <h2 style={styles.logo} onClick={() => router.push("/")}>
        AI Outreach
      </h2>

      <div style={styles.navLinks}>
        <button style={styles.btn} onClick={() => router.push("/")}>
          Home
        </button>

        <button style={styles.btn} onClick={() => router.push("/pricing")}>
          Pricing
        </button>

        <button style={styles.btn} onClick={() => router.push("/how-to-use")}>
          How to use
        </button>

        <button style={styles.btn} onClick={() => router.push("/account")}>
          Account
        </button>

        {user ? (
          <button style={styles.btnDanger} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button style={styles.btnPrimary} onClick={() => router.push("/login")}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}


// Wrap all your objects inside one "styles" object
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

  navLinks: {
    display: "flex",
    gap: "12px",
  },

  btn: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s ease",
  },

  btnHover: {
    background: "#f5f5f5",
  },

  btnPrimary: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #4b4ded, #6c63ff)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  btnDanger: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
};