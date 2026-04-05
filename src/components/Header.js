import React,{useState} from 'react';
import './header.css';
const Header=({handleHeaderNav})=>{
    const [step, setStep] = useState("select");
    const handleClick=()=>{
        handleHeaderNav("adminLogin")
    }
    return(
          <div className="header">

                <span className="logo">DocServo</span>
                <div className="buttonContainer">
                    <button
                        className="admin-btn"
                        onClick={handleClick}
                    >
                        Hospital Login
                    </button>
                    <button
                        className="admin-btn"
                        // onClick={() => setStep("adminLogin")}
                    >
                        Admin Login
                    </button>
                    <button
                        className="admin-btn"
                        // onClick={() => setStep("adminLogin")}
                    >
                        Helpdesk
                    </button>
                    <button
                        className="admin-btn"
                        // onClick={() => setStep("adminLogin")}
                    >
                        Complaints
                    </button>
                    <button
                        className="admin-btn"
                        // onClick={() => setStep("adminLogin")}
                    >
                        Notifications
                    </button>
                </div>


            </div>
    )
}
export default Header;