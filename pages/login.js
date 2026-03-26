import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);

    // Simulate login (no backend yet)
    setTimeout(() => {
      // Save user to localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: email,
          plan: "free", // default plan
          emailsUsed: 0,
          resetDate: new Date().toISOString(),
        })
      );

      // Redirect to homepage
      window.location.href = "/";
    }, 800);
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={{ marginBottom: "20px" }}>Login</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={button}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={{ marginTop: "15px", fontSize: "14px", color: "#666" }}>
          Demo login — no password required
        </p>
      </div>
    </div>
  );
}

//////////////////////////////////////////////////////
// STYLES
//////////////////////////////////////////////////////

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
};

const card = {
  width: "350px",
  padding: "30px",
  borderRadius: "12px",
  background: "#fff",
  boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const button = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(90deg, #5a67d8, #805ad5)",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
};