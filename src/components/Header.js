import React from 'react';
import './header.css';

const Header = ({ handleHeaderNav }) => {
    return (
        <header className="header">
            <div className="logo">
                Doc<span className="logo-accent">Servo</span>
            </div>
            
            <nav className="nav-buttons">
                <button onClick={() => handleHeaderNav("adminLogin")}>Hospital Login</button>
                <button onClick={() => handleHeaderNav("adminLogin")}>Admin Login</button>
                <button>Helpdesk</button>
                <button>Complaints</button>
                <button className="nav-active">Notifications</button>
            </nav>
        </header>
    );
};

export default Header;