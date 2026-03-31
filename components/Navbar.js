import Link from "next/link";
import { useEffect, useState } from "react";


export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

     return <div>Navbar</div>;


  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>AI Outreach</div>

      <div style={styles.links}>
        <NavButton href="/" label="Home" />
        <NavButton href="/pricing" label="Pricing" />   
        <NavButton href="/how-to-use" label="How To Use" />

        {!user && <NavButton href="/login" label="Login" />}
        {user && <NavButton href="/account" label="Account" />}

        {/* CTA BUTTON */}
        <Link href="/pricing" style={styles.upgradeBtn}>
          Upgrade 🚀
        </Link>
      </div>
    </nav>
  );
}

// 🔥 REUSABLE BUTTON COMPONENT
function NavButton({ href, label }) {
  return (
    <Link
      href={href}
      style={styles.button}
      onMouseEnter={(e) => {
        e.target.style.background = "#f1f3ff";
        e.target.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.target.style.background = "#fff";
        e.target.style.transform = "translateY(0)";
      }}
    >
      {label}
    </Link>
  );
}

const styles = {
  nav: {
    width: "100%",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },

  logo: {
    fontWeight: "700",
    fontSize: "18px",
  },

  links: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },

  
  // 🔥 BUTTON STYLE FOR LINKS
  button: {
    padding: "8px 16px",
    borderRadius: "10px",
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
    border: "1px solid #eee",
    background: "#fff",
    transition: "0.2s",
  },


  // HOVER EFFECT (manual inline workaround)
  linkBtnHover: {
    background: "#f5f6fa",
  },

  // 🔥 UPGRADE BUTTON
  upgradeBtn: {
    padding: "8px 16px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "600",
    background: "linear-gradient(135deg, #ff9f43, #ff6b6b)",
    color: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
};