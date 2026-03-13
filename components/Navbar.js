import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        AI Outreach
      </div>

      <div className="links">
        <Link href="/">Home</Link>
        <Link href="/how-to-use">How to Use</Link>
        <Link href="/pricing">Pricing</Link>
      </div>

      <style jsx>{`

        .navbar{
          position:fixed;
          top:0;
          left:0;
          width:100%;
          height:60px;
          background:white;
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:0 20px;
          box-shadow:0 2px 10px rgba(0,0,0,0.08);
          z-index:1000;
          box-sizing:border-box;
        }

        .logo{
          font-size:18px;
          font-weight:700;
          color:#6a7cff;
          white-space:nowrap;
        }

        .links{
          display:flex;
          gap:18px;
          flex-wrap:nowrap;
        }

        .links :global(a){
          text-decoration:none;
          color:#444;
          font-weight:500;
          font-size:14px;
          white-space:nowrap;
        }

        .links :global(a:hover){
          color:#6a7cff;
        }

      `}</style>

    </nav>
  );
}