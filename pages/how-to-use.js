import Navbar from "../components/Navbar";

export default function HowToUse() {

return (

<>
<Navbar />
<a href="/account">Account</a>

<div className="page">

<h1>How to Use the AI Sales Outreach Generator</h1>

<div className="grid">

<div className="card">

<h2>Single Email Generator</h2>

<p>Fill in these fields:</p>

<ul>
<li><b>Contact Name</b> – Person you are emailing</li>
<li><b>Company</b> – Their company</li>
<li><b>Company Website</b> – Helps AI understand the business</li>
<li><b>Industry</b> – Industry the company operates in</li>
</ul>

<p>
Click <b>Generate Email</b> and the AI will instantly create a personalised outreach email.
</p>

</div>

<div className="card">

<h2>Bulk Email Generator</h2>

<p>Generate emails for many leads at once.</p>

<ol>
<li>Prepare a CSV file</li>
<li>Upload the CSV file</li>
<li>Click <b>Generate Emails From CSV</b></li>
<li>The AI generates emails for each lead</li>
<li>Download all emails as a CSV</li>
</ol>

<h3>Example CSV</h3>

<pre>
name,company,website,industry
John Smith,TechFlow,techflow.com,SaaS
Sarah Jones,BuildCorp,buildcorp.com,Construction
</pre>

</div>

<div className="card">

<h2>Tips for Best Results</h2>

<ul>
<li>Use accurate company websites</li>
<li>Include the correct industry</li>
<li>Target decision makers</li>
<li>Review emails before sending</li>
</ul>

</div>

</div>

<style jsx>{`

.page{
min-height:100vh;
padding-top:110px;
background:#f5f7fb;
font-family:Arial;

display:flex;
flex-direction:column;
align-items:center;
text-align:center;
}

h1{
margin-bottom:30px;
}

.grid{
display:grid;
grid-template-columns:repeat(3,1fr);
gap:20px;
max-width:900px;
width:100%;
margin:0 auto;
justify-content:center;
}

.card{
background:white;
padding:20px;
border-radius:10px;
box-shadow:0 8px 20px rgba(0,0,0,0.08);
transition:transform 0.2s ease;
}

.card:hover{
transform:translateY(-4px);
}

h2{
margin-bottom:10px;
font-size:18px;
}

ul{
padding-left:18px;
}

ol{
padding-left:18px;
}

pre{
background:#f3f4f6;
padding:10px;
border-radius:6px;
font-size:13px;
overflow-x:auto;
}

`}</style>

</div>

</>

);

}