import { useState } from "react";

export default function Account() {
  const [email, setEmail] = useState("");

  const manageSubscription = async () => {
    const res = await fetch("/api/portal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert(data.error || "Something went wrong");
    }
  };

  return (
    <>
      {/* ✅ NAVBAR */}
        <div className="navbar">
        <div className="logo">AI Outreach</div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/how-to-use">How to Use</a>
          <a href="/pricing">Pricing</a>
          <a href="/account">Account</a>
        </div>
      </div>
      {/* ✅ MAIN CONTENT */}
      <div className="main">
        <h1>Manage Subscription</h1>

        <div className="container">
          <input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={manageSubscription}>
            Manage Subscription
          </button>

          <p className="hint">Use the same email you used to subscribe</p>

          <p>Cancel or update your plan anytime.</p>
        </div>
      </div>

      <a href="/account">Account</a>

      {/* ✅ STYLES */}
      <style jsx>{`
        body {
          margin: 0;
          background: #f5f6f8;
          font-family: Arial;
        }

        /* NAVBAR */
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

        /* MAIN */
        .main {
          height: calc(100vh - 70px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        h1 {
          margin-bottom: 20px;
        }

        /* CONTAINER */
        .container {
          background: white;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          width: 100%;
          max-width: 420px;

          display: flex;
          flex-direction: column;
          gap: 15px;
          align-items: center;
        }

        input {
          width: 100%;
          max-width: 320px;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #ddd;
        }

        button {
          width: 100%;
          max-width: 320px;
          padding: 12px;
          border-radius: 8px;
          background: linear-gradient(90deg, #5a67ff, #6b73ff);
          color: white;
          font-weight: bold;
          border: none;
          cursor: pointer;
        }

        p {
          font-size: 13px;
          color: #666;
          text-align: center;
        }
      `}</style>
    </>
  );
}