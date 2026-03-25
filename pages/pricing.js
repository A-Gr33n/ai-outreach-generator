export default function Pricing() {
  const setPlan = (plan) => {
    localStorage.setItem("plan", plan);
  };

  return (
    <div className="container">
      <h1>Pricing</h1>

      <div className="pricing-grid">

        <div className="pricing-card">
          <h2>Free Demo</h2>
          <h3>£0</h3>
          <ul>
            <li>First 3 generators free</li>
            <li>AI generated outreach email</li>
            <li>Test the product</li>
          </ul>
          <a href="/" className="btn" onClick={() => setPlan("FREE")}>
            Start Free
          </a>
        </div>

        <div className="pricing-card">
          <h2>Starter</h2>
          <h3>£19 / month</h3>
          <ul>
            <li>100 email generations</li>
            <li>AI company research</li>
            <li>Email copy & export</li>
          </ul>
          <a href="https://buy.stripe.com/test_3cI00j7xq88QboxbDE5kk01" className="btn" onClick={() => setPlan("STARTER")}>
            Upgrade
          </a>
        </div>

        <div className="pricing-card highlight">
          <h2>Pro</h2>
          <h3>£49 / month</h3>
          <ul>
            <li>Unlimited generators</li>
            <li>Bulk CSV email generator</li>
            <li>Campaign downloads</li>
          </ul>
          <a href="https://buy.stripe.com/test_bJe4gz1924WE2S1dLM5kk02" className="btn" onClick={() => setPlan("PRO")}>
            Upgrade
          </a>
        </div>

        <div className="pricing-card">
          <h2>Agency</h2>
          <h3>£99 / month</h3>
          <ul>
            <li>Unlimited campaigns</li>
            <li>Bulk lead outreach</li>
            <li>Team usage</li>
          </ul>
          <a href="https://buy.stripe.com/test_fZu6oH9Fy3SAfEN2345kk03" className="btn" onClick={() => setPlan("AGENCY")}>
            Upgrade
          </a>
        </div>

      </div>
    </div>
  );
}