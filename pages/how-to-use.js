import Navbar from "../components/Navbar";

export default function HowToUse() {
  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card">

          <h1>How to Use the AI Sales Outreach Generator</h1>

          <p className="intro">
            This tool helps you generate personalized cold outreach emails in seconds.
          </p>

          <h2>Step 1 — Enter Prospect Details</h2>

          <p>Add the basic information about the person you want to contact:</p>

          <ul>
            <li><b>Prospect Name</b> – the person you are emailing</li>
            <li><b>Company Name</b> – the company they work for</li>
            <li><b>Company Website</b> – used by AI to research the business</li>
            <li><b>Target Role</b> – job title like Head of Sales or Founder</li>
            <li><b>Industry</b> – helps the AI tailor the message</li>
          </ul>

          <h2>Step 2 — Describe Your Product</h2>

          <p>
            Tell the AI what you are selling. This helps the system write relevant
            outreach emails.
          </p>

          <p className="example">
            Example: <br />
            “AI software that helps sales teams automate prospect research and
            write personalized outreach emails.”
          </p>

          <h2>Step 3 — Choose Tone & Length</h2>

          <p>You can control how the email sounds:</p>

          <ul>
            <li><b>Friendly</b> – casual and conversational</li>
            <li><b>Professional</b> – formal and corporate</li>
            <li><b>Short</b> – quick outreach message</li>
            <li><b>Long</b> – more detailed email</li>
          </ul>

          <h2>Step 4 — Generate Email</h2>

          <p>
            Click <b>Generate Email</b> and the AI will instantly create a personalized
            outreach email based on the information you entered.
          </p>

          <h2>Step 5 — Copy and Send</h2>

          <p>
            Copy the generated email and send it through your email outreach
            platform or CRM.
          </p>

        </div>
      </div>

      <style jsx>{`

        .container{
min-height:100vh;
background:linear-gradient(135deg,#6a7cff,#7a3cff);
display:flex;
justify-content:center;
padding-top:110px;
padding-bottom:80px;
padding-left:20px;
padding-right:20px;
box-sizing:border-box;
}

.page{
min-height:100vh;
background:linear-gradient(135deg,#5f5cff,#8a5cff);
display:flex;
justify-content:center;
align-items:flex-start;
padding-top:120px;
padding-bottom:60px;
overflow-y:auto;
}

.card{
background:white;
max-width:600px;
width:100%;
padding:32px;
border-radius:14px;
box-shadow:0 18px 50px rgba(0,0,0,0.18);
line-height:1.6;
margin:auto;
}

.example{
background:#f4f6ff;
padding:16px;
border-radius:8px;
margin-top:10px;
font-style:italic;
}

        h1{
          margin-bottom:8px;
font-size:28px;
        }

        .intro{
          margin-bottom:25px;
          color:#555;
        }

        h2{
          margin-top:24px;
margin-bottom:8px;
font-size:20px;
        }

        ul{
          padding-left:20px;
        }

        li{
          margin-bottom:8px;
        }

        .example{
          background:#f4f6ff;
          padding:15px;
          border-radius:8px;
          margin-top:10px;
        }

      `}</style>
    </>
  );
}