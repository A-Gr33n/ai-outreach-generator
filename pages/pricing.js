import Navbar from "../components/Navbar";

export default function Pricing() {

return (

<>
<Navbar />

<a href="/account">Account</a>

<div className="page">

<h1 className="title">Pricing</h1>

<div className="pricingContainer">

<div className="grid">

<div className="card">

<h2>Free Demo</h2>
<h3>£0</h3>

<ul>
<li>First 3 generators free</li>
<li>AI generated outreach email</li>
<li>Test the product</li>
</ul>



 <a href="/" className="btn">
Start Free
</a>

</div>


<div className="card">

<h2>Starter</h2>
<h3>£19 / month</h3>



<ul>
<li>100 email generations</li>
<li>AI company research</li>
<li>Email copy & export</li>
</ul>

<a 
href="https://buy.stripe.com/test_3cI00j7xq88QboxbDE5kk01"
target="_blank"
className="btn"
>
Upgrade
</a>


</div>


<div className="card">

<h2>Pro</h2>
<h3>£49 / month</h3>

<ul>
<li>Unlimited generators</li>
<li>Bulk CSV email generator</li>
<li>Campaign downloads</li>
</ul>

<a 
href="https://buy.stripe.com/test_bJe4gz1924WE2S1dLM5kk02"
target="_blank"
className="btn"
>
Upgrade
</a>


</div>


<div className="card">

<h2>Agency</h2>
<h3>£99 / month</h3>

<ul>
<li>Unlimited campaigns</li>
<li>Bulk lead outreach</li>
<li>Team usage</li>
</ul>

<a 
href="https://buy.stripe.com/test_fZu6oH9Fy3SAfEN2345kk03"
target="_blank"
className="btn"
>
Upgrade
</a>


</div>

</div>

</div>

<style jsx>{`

.page{
min-height:100vh;
padding-top:110px;
padding-left:20px;
padding-right:20px;

display:flex;
flex-direction:column;
align-items:center;

background:#f5f7fb;
font-family:Arial;
}

.title{
margin-bottom:40px;
}

.pricingContainer{
display:flex;
justify-content:center;
width:100%;
}

.grid{
display:grid;
grid-template-columns:repeat(2, 1fr);
gap:30px;

max-width:800px;
width:100%;
margin:auto;
}

.card{
background:white;
padding:30px;
border-radius:12px;
box-shadow:0 8px 20px rgba(0,0,0,0.08);

text-align:center;

max-width:320px;
margin:auto;

transition:transform 0.2s ease;
}

.card:hover{
transform:translateY(-5px);
}

h2{
margin-bottom:5px;
}

h3{
color:#4f46e5;
margin-bottom:15px;
}

ul{
text-align:left;
padding-left:18px;
margin-bottom:20px;
}

.btn{
background:#4f46e5;
color:white;
border:none;
padding:12px 18px;
border-radius:8px;
cursor:pointer;
font-weight:600;

display:block;
text-align:center;
text-decoration:none;
}

.btn:hover{
background:#4338ca;
}

`}</style>

</div>

</>


);

}

const plans = {
free: {
limit: 3,
bulk: false,
research: false
},

starter: {
limit: 100,
bulk: false,
research: true
},

pro: {
limit: Infinity,
bulk: true,
research: true
},

agency: {
limit: Infinity,
bulk: true,
research: true,
team: true
}
};