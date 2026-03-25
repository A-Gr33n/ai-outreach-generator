import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "20px 40px",
      background: "#fff",
      borderBottom: "1px solid #ddd",
    }}>
      <h2 style={{ color: "#4b4ded" }}>AI Outreach</h2>

      <div style={{ display: "flex", gap: "25px" }}>
        <Link href="/">Home</Link>
        <Link href="/how-to-use">How to Use</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/account">Account</Link>
      </div>
    </nav>
  );
}