import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>AI Outreach</h2>

      <div style={styles.links}>
        <Link href="/">Home</Link>
        <Link href="/how-to-use">How to Use</Link> {/* ✅ ADDED */}
        <Link href="/pricing">Pricing</Link>

        {user && <Link href="/account">Account</Link>}
        {!user && <Link href="/login">Login</Link>}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    borderBottom: "1px solid #ddd",
    background: "#fff",
  },
  logo: {
    color: "#4b4ded",
  },
  links: {
    display: "flex",
    gap: "30px",
  },
};