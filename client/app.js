import "@/styles/globals.css";
import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";


export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-to-use" element={<HowToUse />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

//////////////////////////////////////////////////////
// NAVBAR
//////////////////////////////////////////////////////

function Navbar() {
  return (
 <nav style={navStyle}>
  <h2>AI Outreach</h2>
  <div style={{ display: "flex", gap: "20px" }}>
    <Link href="/">Home</Link>
    <Link href="/how-to-use">How to Use</Link>
    <Link href="/pricing">Pricing</Link>
    <Link href="/account">Account</Link>
  </div>
</nav>
  );
}

//////////////////////////////////////////////////////
// HOME (YOUR GENERATOR PAGE)
//////////////////////////////////////////////////////

function Home() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, company, website, industry }),
      });

      const data = await res.json();
      setEmail(data.email);
    } catch (err) {
      alert("Error generating email");
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", paddingTop: "40px" }}>
      <h1>AI Sales Outreach Generator</h1>

      <div style={cardStyle}>
        <p>Plan: <strong>STARTER</strong></p>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleGenerate} style={buttonStyle}>
          {loading ? "Generating..." : "Generate Email"}
        </button>

        <button style={bulkButtonStyle}>
          Bulk Generate (CSV)
        </button>

        {email && (
          <textarea
            value={email}
            readOnly
            rows={10}
            style={textareaStyle}
          />
        )}
      </div>
    </div>
  );
}

//////////////////////////////////////////////////////
// OTHER PAGES (PLACEHOLDERS)
//////////////////////////////////////////////////////

function HowToUse() {
  return <h2 style={pageStyle}>How to Use Page</h2>;
}

function Pricing() {
  return <h2 style={pageStyle}>Pricing Page</h2>;
}

function Account() {
  return <h2 style={pageStyle}>Account Page</h2>;
}

//////////////////////////////////////////////////////
// STYLES
//////////////////////////////////////////////////////

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "20px 40px",
  background: "#fff",
  borderBottom: "1px solid #ddd",
};

const cardStyle = {
  background: "#fff",
  padding: "30px",
  borderRadius: "12px",
  width: "400px",
  margin: "40px auto",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  background: "linear-gradient(90deg, #5f6dfc, #8b5cf6)",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const bulkButtonStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  background: "#0f766e",
  color: "white",
  border: "none",
  borderRadius: "8px",
};

const textareaStyle = {
  width: "100%",
  marginTop: "20px",
  padding: "10px",
  borderRadius: "8px",
};

const pageStyle = {
  textAlign: "center",
  marginTop: "50px",
};