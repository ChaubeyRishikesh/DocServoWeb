import React,{useState} from "react";
import Header from "./Header";
const AdminLogin=({setAdminHospital,setStep})=>{

const [user,setUser]=useState("HH001_admin");
const [pass,setPass]=useState("1234");

const login=()=>{

if(pass==="1234"){

const hospital=user.split("_")[0];

setAdminHospital(hospital);
setStep("admin");

}
else{
alert("Invalid Login");
}

};

return(
<>
<Header/>
<div className="card">

<h2>Admin Login</h2>

<input
placeholder="HH001_admin"
onChange={(e)=>setUser(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPass(e.target.value)}
/>

<button onClick={login}>
Login
</button>

<button onClick={()=>setStep("select")}>
Back
</button>

</div>
</>
)

};

export default AdminLogin;