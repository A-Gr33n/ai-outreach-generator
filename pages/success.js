import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Success(){

const router = useRouter();
const { plan } = router.query;

useEffect(()=>{

if(plan){
localStorage.setItem("plan", plan);
}

},[plan]);

return(

<div style={{padding:"120px", textAlign:"center"}}>

<h1>Payment Successful 🎉</h1>

<p>Your plan has been activated.</p>

<a href="/">Go to Generator</a>

</div>

);

}