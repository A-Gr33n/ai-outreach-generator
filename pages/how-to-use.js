export default function HowToUse() {
  return (
    <div style={styles.page}>
      
      {/* TITLE */}
      <h1 style={styles.title}>
        How to Use the AI Sales Outreach Generator
      </h1>

      {/* GRID */}
      <div style={styles.grid}>
        
        {/* LEFT COLUMN */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Single Email</h3>
          <p style={styles.label}>Fill in:</p>

          <ul style={styles.list}>
            <li><strong>Contact Name</strong> – who you're emailing</li>
            <li><strong>Company</strong> – their company</li>
            <li><strong>Website</strong> – company site</li>
            <li><strong>Industry</strong> – your business</li>
          </ul>
        </div>

        {/* CENTER COLUMN */}
        <div style={styles.cardHighlight}>
          <h3 style={styles.cardTitle}>Bulk Email Generator</h3>

          <ol style={styles.list}>
            <li>Prepare a CSV file</li>
            <li>Upload the CSV file</li>
            <li><strong>Generate Emails From CSV</strong></li>
            <li>AI creates emails for each lead</li>
            <li>Download all emails as CSV</li>
          </ol>

          <div style={styles.csvBox}>
            <strong>Example CSV:</strong><br />
            name,company,website,industry<br />
            John Smith,TechFlow,techflow.com,SaaS<br />
            Sarah Jones,BuildCorp,buildcorp.com,Construction
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Tips</h3>

          <ul style={styles.list}>
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

const styles = {
  page: {
    padding: "80px 20px",
    background: "#f9fafb",
    minHeight: "100vh",
  },

  title: {
    textAlign: "center",
    fontSize: "40px",
    fontWeight: "700",
    marginBottom: "60px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 1fr",
    gap: "25px",
    maxWidth: "1100px",
    margin: "0 auto",
  },

  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },

  cardHighlight: {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
    transform: "scale(1.03)",
  },

  cardTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "10px",
  },

  label: {
    marginTop: "10px",
    fontWeight: "500",
  },

}