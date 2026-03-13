import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

export default function Home() {

const [prospectName, setProspectName] = useState("");
const [companyName, setCompanyName] = useState("");
const [companyWebsite, setCompanyWebsite] = useState("");
const [targetRole, setTargetRole] = useState("");
const [industry, setIndustry] = useState("");
const [product, setProduct] = useState("");

const [tone, setTone] = useState("Friendly");
const [length, setLength] = useState("Short");

const [generatedEmail, setGeneratedEmail] = useState("");

const [usageCount, setUsageCount] = useState(0);
const [limitReached, setLimitReached] = useState(false);
const [notification, setNotification] = useState("");


const generateEmail = async () => {


  // check free usage
  if (usageCount >= 3) {
    setLimitReached(true);
    return;
  }

  try {

    const res = await fetch("/api/generate-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prospectName,
        companyName,
        companyWebsite,
        targetRole,
        industry,
        product,
        tone,
        length
      })
    });

    const data = await res.json();

    setGeneratedEmail(data.email);

    const newCount = usageCount + 1;

setUsageCount(newCount);

localStorage.setItem("usageCount", newCount);

    window.scrollTo({ top: 0, behavior: "smooth" });

  } catch (error) {

    setGeneratedEmail("Error generating email. Check API setup.");

    setNotification("✅ Email successfully generated!");

setTimeout(() => {
  setNotification("");
}, 3000);

  }
};


const copyEmail = () => {

navigator.clipboard.writeText(generatedEmail);

alert("Email copied!");

};


const exportEmail = () => {

const blob = new Blob([generatedEmail], { type: "text/plain" });

const url = URL.createObjectURL(blob);

const link = document.createElement("a");

link.href = url;

link.download = "ai-outreach-email.txt";

link.click();

};

useEffect(() => {

const savedCount = localStorage.getItem("usageCount");

if (savedCount) {
  setUsageCount(parseInt(savedCount));

  if (parseInt(savedCount) >= 3) {
    setLimitReached(true);
  }
}

}, []);



return (

<>
<Navbar />

<main className="page">

<div className="container">

<h1>AI Sales Outreach Generator</h1>

{notification && (
  <div className="notification">
    {notification}
  </div>
)}

<p>Generate personalized outreach emails instantly</p>


<input
placeholder="Prospect Name"
value={prospectName}
onChange={(e)=>setProspectName(e.target.value)}
/>

<input
placeholder="Company Name"
value={companyName}
onChange={(e)=>setCompanyName(e.target.value)}
/>

<input
placeholder="Company Website"
value={companyWebsite}
onChange={(e)=>setCompanyWebsite(e.target.value)}
/>

<input
placeholder="Target Role"
value={targetRole}
onChange={(e)=>setTargetRole(e.target.value)}
/>


<select
value={industry}
onChange={(e)=>setIndustry(e.target.value)}
>
<option value="">Select Industry</option>
<option>SaaS</option>
<option>Marketing</option>
<option>Ecommerce</option>
<option>Finance</option>
<option>Healthcare</option>
<option>Consulting</option>
</select>


<input
placeholder="Your Product or Service"
value={product}
onChange={(e)=>setProduct(e.target.value)}
/>


<div className="row">

<select
value={tone}
onChange={(e)=>setTone(e.target.value)}
>
<option>Friendly</option>
<option>Professional</option>
<option>Direct</option>
</select>

<select
value={length}
onChange={(e)=>setLength(e.target.value)}
>
<option>Short</option>
<option>Medium</option>
<option>Long</option>
</select>

</div>

<button
className="generateBtn"
onClick={generateEmail}
disabled={limitReached}
>
{limitReached ? "Upgrade to Continue" : "Generate Email"}
</button>



{generatedEmail && (

<div className="resultBox">

<h3>Generated Email</h3>

<pre>{generatedEmail}</pre>

<div className="buttonRow">

<button className="copyBtn" onClick={copyEmail}>
Copy Email
</button>

<button className="downloadBtn" onClick={exportEmail}>
Download Email
</button>

</div>

</div>

)}



{limitReached && (

<div className="upgradeBox">

<h3>Free Demo Limit Reached</h3>

<p>You have used all 3 free email generations.</p>

<p>Unlock unlimited AI outreach emails + company research.</p>

<a
href="https://buy.stripe.com/test_eVq8wP6tmbl25090Z05kk00"
target="_blank"
className="upgradeBtn"
>
Upgrade to Full Version
</a>

</div>

)}

</div>

</main>



<style jsx>{`

.page{
min-height:100vh;
background:linear-gradient(135deg,#5f5cff,#8a5cff);
padding-top:120px;
padding-bottom:60px;
}

.container{
background:white;
padding:35px;
border-radius:12px;

max-width:520px;
width:90%;

margin:0 auto;

box-shadow:0 10px 30px rgba(0,0,0,0.1);

display:flex;
flex-direction:column;
}

h1{
margin-bottom:10px;
}

p{
margin-bottom:20px;
color:#555;
}

input, select{
width:100%;
padding:12px;
margin-top:10px;
margin-bottom:10px;
border-radius:6px;
border:1px solid #ccc;
font-size:14px;
}

.row{
display:flex;
gap:10px;
}

.generateBtn{
width:100%;
padding:14px;
background:#5f5cff;
color:white;
border:none;
border-radius:6px;
font-size:16px;
cursor:pointer;
}

.generateBtn:hover{
background:#4b48e6;
}

.resultBox{
margin-top:20px;
background:#f5f5f5;
padding:15px;
border-radius:8px;

max-height:220px;
overflow-y:auto;
}

pre{
white-space:pre-wrap;
word-wrap:break-word;
font-family:inherit;
}

.buttonRow{
display:flex;
gap:10px;
margin-top:10px;
}

.copyBtn{
padding:10px;
border:none;
background:#444;
color:white;
border-radius:6px;
cursor:pointer;
}

.downloadBtn{
padding:10px;
border:none;
background:#5f5cff;
color:white;
border-radius:6px;
cursor:pointer;
}

.upgradeBox{
margin-top:20px;
background:#fff3cd;
padding:20px;
border-radius:8px;
text-align:center;
}

.upgradeBtn{
display:inline-block;
margin-top:10px;
padding:12px 20px;
background:#ff6b00;
color:white;
text-decoration:none;
border-radius:6px;
}

.notification{
background:#e8f7ee;
border:1px solid #3ecf8e;
color:#1f7a4d;

padding:12px;
border-radius:8px;

margin-bottom:15px;

text-align:center;

font-weight:500;

animation:fadeIn 0.3s ease;
}

@keyframes fadeIn{
from{opacity:0; transform:translateY(-5px);}
to{opacity:1; transform:translateY(0);}
}

`}</style>

</>

);

}