import React, { useState } from "react";
import Header from "./Header";
import "./login.css";

const AdminLogin = ({ setAdminHospital, setStep }) => {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("1234");

    const login = () => {
        if (pass === "1234") {
            const hospital = user.split("_")[0];
            setAdminHospital(hospital);
            setStep("admin");
        } else {
            alert("Invalid Login Credentials");
        }
    };

    return (
        <div className="login-page">
            <Header handleHeaderNav={(e) => setStep(e)} />
            
            <div className="login-content">
                <div className="login-card">
                    <h2>Admin Login</h2>
                    <p className="subtitle">Access your hospital portal</p>
                    
                    <input
                        type="text"
                        placeholder="Username"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPass(e.target.value)}
                    />

                    <button className="btn-primary" onClick={login}>Login</button>
                    <button className="btn-secondary" onClick={() => setStep("select")}>Back to Home</button>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;