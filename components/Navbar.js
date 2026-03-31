import { useEffect, useState } from "react";
import { useRouter } from "next/router";



export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div style={styles.nav}>
      <h2 style={styles.logo} onClick={() => router.push("/")}>
        AI Outreach
      </h2>

      <div style={styles.links}>
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

        {!user ? (
          <button style={styles.btnPrimary} onClick={() => router.push("/login")}>
            Login
          </button>
        ) : (
          <button style={styles.btnDanger} onClick={handleLogout}>
            Logout
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


