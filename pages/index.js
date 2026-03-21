import { useState, useEffect } from "react";
import Papa from "papaparse";
import Navbar from "../components/Navbar";

export default function Home() {

const [name,setName] = useState("");
const [company,setCompany] = useState("");
const [website,setWebsite] = useState("");
const [industry,setIndustry] = useState("");

const [email,setEmail] = useState("");
const [notification,setNotification] = useState("");

const [usageCount,setUsageCount] = useState(0);
const [limitReached,setLimitReached] = useState(false);

const [leads,setLeads] = useState([]);
const [generatedEmails,setGeneratedEmails] = useState([]);

useEffect(()=>{

const savedCount = localStorage.getItem("usageCount");

if(savedCount){

setUsageCount(parseInt(savedCount));

if(parseInt(savedCount) >= 3){
setLimitReached(true);
}

}

},[]);

const generateEmail = async () => {

  const limits = {
free:3,
starter:100,
pro:Infinity,
agency:Infinity
};

if(usageCount >= limits[plan]){
alert("Generation limit reached. Upgrade your plan.");
return;
}

if(savedPlan){
setPlan(savedPlan);
}

if(plan === "free" || plan === "starter"){
alert("Bulk generator available on Pro plan.");
return;
}

if(plan === "free"){
companySummary = "";
}

const response = await fetch("/api/generate",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name,
company,
website,
industry
})

});

const data = await response.json();

setEmail(data.email);

const newCount = usageCount + 1;

setUsageCount(newCount);

localStorage.setItem("usageCount",newCount);

setNotification("Email generated successfully!");

setTimeout(()=>{
setNotification("");
},3000);

window.scrollTo({top:0,behavior:"smooth"});

};

const copyEmail = () => {

navigator.clipboard.writeText(email);

setNotification("Email copied!");

setTimeout(()=>{
setNotification("");
},2000);

};

const handleFileUpload = (event) => {

const file = event.target.files[0];

Papa.parse(file,{
header:true,
complete:(results)=>{
setLeads(results.data);
}
});

};

const generateBulkEmails = async () => {

let emails = [];

for(let lead of leads){

const response = await fetch("/api/generate",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name:lead.name,
company:lead.company,
website:lead.website,
industry:lead.industry
})

});

const data = await response.json();

emails.push({
...lead,
email:data.email
});

}

const [plan,setPlan] = useState("free");

useEffect(()=>{

const savedPlan = localStorage.getItem("plan");

},[]);

{
  const params = new URLSearchParams(window.location.search);

  const success = params.get("success");
  const newPlan = params.get("plan");

  if (success && newPlan) {
    localStorage.setItem("plan", newPlan);
    setPlan(newPlan);

    // optional clean URL
    window.history.replaceState({}, document.title, "/");
  }
}

setGeneratedEmails(emails);

setNotification("Bulk emails generated!");

setTimeout(()=>{
setNotification("");
},3000);

};


const downloadCSV = () => {

const rows = generatedEmails.map(lead=>({
Name:lead.name,
Company:lead.company,
Email:lead.email
}));

const csv = Papa.unparse(rows);

const blob = new Blob([csv],{type:"text/csv"});

const url = URL.createObjectURL(blob);

const a = document.createElement("a");

a.href = url;
a.download = "generated-outreach.csv";

a.click();

};

return (

<>
<Navbar />
<a href="/account">Account</a>

<div className="page">


<h1>AI Sales Outreach Generator</h1>

{notification && (
<div className="notification">
{notification}
</div>
)}

<div className="card">

<input
placeholder="Contact Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Company"
value={company}
onChange={(e)=>setCompany(e.target.value)}
/>

<input
placeholder="Company Website"
value={website}
onChange={(e)=>setWebsite(e.target.value)}
/>

<input
placeholder="Industry"
value={industry}
onChange={(e)=>setIndustry(e.target.value)}
/>

<button onClick={generateEmail}>
Generate Email
</button>

{email && (

<div className="emailBox">

<h3>Generated Email</h3>

<p>{email}</p>

<button className="copyBtn" onClick={copyEmail}>
Copy Email
</button>

</div>

)}

{limitReached && (

<div className="upgradeBox">

<h3>Free demo limit reached</h3>

<p>Upgrade to continue generating emails.</p>

<a href="/pricing">
<button>Upgrade Now</button>
</a>

</div>

)}

</div>

<div className="bulkSection">

<h2>Bulk Email Generator</h2>

<input
type="file"
accept=".csv"
onChange={handleFileUpload}
/>

<button onClick={generateBulkEmails}>
Generate Emails From CSV
</button>

{generatedEmails.length > 0 && (

<>

<button onClick={downloadCSV}>
Download Emails CSV
</button>

{generatedEmails.map((lead,index)=>(

<div key={index} className="emailCard">

<h4>{lead.name} - {lead.company}</h4>

<p>{lead.email}</p>

</div>

))}

</>

)}

</div>

<style jsx>{`

.page{
min-height:100vh;
display:flex;
flex-direction:column;
align-items:center;
padding-top:120px;
padding-left:40px;
padding-right:40px;
background:#f5f7fb;
font-family:Arial;
}

h1{
margin-bottom:20px;
}

.card{
background:white;
padding:30px;
border-radius:10px;
width:420px;
display:flex;
flex-direction:column;
gap:10px;
box-shadow:0 4px 10px rgba(0,0,0,0.1);
max-width:480px;
width:100%;
}

.container{
min-height:100vh;
display:flex;
justify-content:center;
align-items:center;
background:linear-gradient(135deg,#6a7cff,#7a3cff);
padding-top:100px;
font-family:sans-serif;
}

input{
padding:10px;
border:1px solid #ccc;
border-radius:6px;
}

button{
padding:10px;
border:none;
background:#4f46e5;
color:white;
border-radius:6px;
cursor:pointer;
}

button:hover{
background:#4338ca;
}

.emailBox{
margin-top:20px;
background:#f3f4f6;
padding:15px;
border-radius:8px;
}

.copyBtn{
margin-top:10px;
background:#10b981;
}

.upgradeBox{
margin-top:20px;
background:#fee2e2;
padding:15px;
border-radius:8px;
text-align:center;
}

.notification{
background:#10b981;
color:white;
padding:10px;
border-radius:6px;
margin-bottom:20px;
}

.bulkSection{
margin-top:40px;
width:650px;
display:flex;
flex-direction:column;
gap:15px;
}

.emailCard{
background:white;
padding:15px;
border-radius:8px;
box-shadow:0 2px 8px rgba(0,0,0,0.1);
}

 .navbar{
          position:fixed;
          top:0;
          left:0;
          width:100%;
          height:60px;
          background:white;
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:0 40px;
          box-shadow:0 2px 10px rgba(0,0,0,0.08);
          z-index:1000;
        }


`}</style>

</div>

</>

);

}