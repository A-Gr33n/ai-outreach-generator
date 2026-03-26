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

  // ✅ Define the button style here in JS
  const upgradeBtn = {
    marginTop: "15px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(90deg, #5a67d8, #805ad5)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%",
    maxWidth: "320px",
  };

  return (
    <>
      <div className="main">
        <h1>Manage Subscription</h1>

        <p style={{ marginTop: "10px", color: "#666" }}>
          Upgrade anytime to unlock more features
        </p>

        <div className="container">
          <input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={() => (window.location.href = "/pricing")}
            style={upgradeBtn}
          >
            Manage Subscription / Upgrade
          </button>

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