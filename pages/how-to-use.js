export default function HowToUse() {
  return (
    <div className="container">
      <h1 style={{ marginBottom: "40px" }}>
        How to Use the AI Sales Outreach Generator
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr",
        gap: "20px",
        alignItems: "stretch"
      }}>
        
        {/* LEFT COLUMN */}
        <div className="card">
          <h3>Single Email</h3>
          <p style={{ marginTop: "10px" }}>Fill in:</p>

          <ul style={{ textAlign: "left", marginTop: "10px" }}>
            <li><strong>Contact Name</strong> – who you're emailing</li>
            <li><strong>Company</strong> – their company</li>
            <li><strong>Website</strong> – company site</li>
            <li><strong>Industry</strong> – your business </li>
          </ul>
        </div>

        {/* CENTER COLUMN */}
        <div className="card">
          <h3>Bulk Email Generator</h3>

          <ol style={{
            textAlign: "left",
            marginTop: "15px",
            lineHeight: "1.8"
          }}>
            <li>Prepare a CSV file</li>
            <li>Upload the CSV file</li>
            <li>Click <strong>Generate Emails From CSV</strong></li>
            <li>The AI generates emails for each lead</li>
            <li>Download all emails as a CSV</li>
          </ol>

          <div style={{
            marginTop: "20px",
            background: "#f3f4f6",
            padding: "10px",
            borderRadius: "8px",
            fontSize: "14px",
            textAlign: "left"
          }}>
            <strong>Example CSV:</strong><br />
            name,company,website,industry<br />
            John Smith,TechFlow,techflow.com,SaaS<br />
            Sarah Jones,BuildCorp,buildcorp.com,Construction
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="card">
          <h3>Tips</h3>

          <ul style={{
            textAlign: "left",
            marginTop: "10px",
            lineHeight: "1.8"
          }}>
            <li>Use accurate company data</li>
            <li>Choose correct industry</li>
            <li>Target decision-makers</li>
            <li>Review emails before sending</li>
          </ul>
        </div>

      </div>
    </div>
  );
}