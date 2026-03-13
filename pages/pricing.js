import Navbar from "../components/Navbar";

export default function Pricing() {

  return (
    <div>

      <Navbar />

      <div className="container">

        <h1>Pricing</h1>

        <div className="plans">

          <div className="plan">
            <h2>Free</h2>
            <p>£0 / month</p>
            <ul>
              <li>10 AI emails per month</li>
              <li>Basic personalization</li>
            </ul>
          </div>

          <div className="plan featured">
            <h2>Pro</h2>
            <p>£29 / month</p>
            <ul>
              <li>Unlimited email generation</li>
              <li>AI website research</li>
              <li>3 email variations</li>
            </ul>
          </div>

        </div>

      </div>

<style jsx>{`

.container{
padding-top:120px;
display:flex;
flex-direction:column;
align-items:center;
font-family:sans-serif;
}

.plans{
display:flex;
gap:40px;
margin-top:40px;
}

.plan{
background:white;
padding:30px;
border-radius:12px;
width:260px;
box-shadow:0 10px 30px rgba(0,0,0,0.1);
}

.featured{
border:2px solid #6a7cff;
}

h1{
color:#333;
}

ul{
margin-top:10px;
}

`}</style>

    </div>
  );
}