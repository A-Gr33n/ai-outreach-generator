import Link from "next/link";

export default function Navbar() {
  return (
      
     <div className="navbar">
        <div className="logo">AI Outreach</div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/how-to-use">How to Use</a>
          <a href="/pricing">Pricing</a>
          <a href="/account">Account</a>
        </div>
     
      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          padding: 15px 30px;
          background: white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        }

        .logo {
          color: #5a67ff;
          font-weight: bold;
        }

        .nav-links a {
          margin-left: 20px;
          text-decoration: none;
          color: #333;
        }
      `}</style>
    </div>
  );
}

     