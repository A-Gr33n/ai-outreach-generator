import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav style={nav}>
      {/* LEFT: LOGO */}
      <h2 style={logo}>AI Outreach</h2>

      {/* RIGHT: LINKS */}
      <div style={links}>
        <Link href="/">Home</Link>
        <Link href="/how-to-use">How To Use</Link>
        <Link href="/pricing">Pricing</Link>

        {/* Show ONLY when logged in */}
        {user && <Link href="/account">Account</Link>}

        {/* Show login OR logout */}
        {!user ? (
          <Link href="/login">Login</Link>
        ) : (
          <button onClick={handleLogout} style={logoutBtn}>
            Logout
          </button>
        )}

        {/* PLAN BADGE */}
        {user && (
          <span style={planBadge}>
            {user.plan?.toUpperCase()}
          </span>
        )}
      </div>
    </nav>
  );
}

//////////////////////////////////////////////////////
// STYLES
//////////////////////////////////////////////////////

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 40px",
  background: "#fff",
  borderBottom: "1px solid #ddd",
};

const logo = {
  color: "#4b4ded",
  fontWeight: "bold",
};

const links = {
  display: "flex",
  gap: "25px",
  alignItems: "center",
};

const logoutBtn = {
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "red",
  fontWeight: "500",
};

const planBadge = {
  background: "#4b4ded",
  color: "#fff",
  padding: "5px 10px",
  borderRadius: "8px",
  fontSize: "12px",
  fontWeight: "bold",
};