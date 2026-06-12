import React, { useState } from "react";
import "./admin.css";

const Admin = ({ 
    patients, setPatients, pending, setPending, hospital, 
    currentToken, setCurrentToken, bookingEnabled, setBookingEnabled, 
    adminMessage, setAdminMessage, logout, doctorInfo 
}) => {
    const [activeTab, setActiveTab] = useState("dashboard");
    
    // Subscription Logic (15-day threshold)
    const expiryDate = new Date("2026-06-27"); 
    const today = new Date();
    const diffDays = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

    return (
        <div className="admin-page">
            {/* FULL WIDTH HEADER */}
            <header className="full-width-header">
                <div className="brand">
                    <h2>DocServo Admin</h2>
                    <div className="doc-meta">
                        Welcome back, <strong>{doctorInfo?.name}</strong> | <span className="hosp">{hospital}</span>
                    </div>
                </div>
                <button className="power-icon-btn" onClick={logout} title="Logout">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
                </button>
            </header>

            {/* SUBSCRIPTION ALERT */}
            <div className={`expiry-alert ${diffDays > 15 ? 'success' : 'warning'}`}>
                {diffDays > 15 ? (
                    <span>Thank you for using DocServo. Your service is active until {expiryDate.toDateString()}.</span>
                ) : (
                    <span>⚠️ Your subscription expires in {diffDays} days! <button className="btn-small btn-pay">Pay to Continue</button></span>
                )}
            </div>

            <nav className="admin-nav">
                {["dashboard", "pending", "queue", "stats"].map(tab => (
                    <button key={tab} className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)}>
                        {tab.toUpperCase()}
                    </button>
                ))}
            </nav>

            <main className="admin-content">
                {activeTab === "dashboard" && (
                    <div className="dashboard-grid">
                        <section className="card token-box">
                            <h3>Live Token Management</h3>
                            <div className="token-display">{currentToken}</div>
                            <div className="controls">
                                <button onClick={() => setCurrentToken(prev => Math.max(1, prev - 1))}>Previous</button>
                                <button onClick={() => setCurrentToken(prev => prev + 1)}>Next</button>
                            </div>
                            <input type="number" value={currentToken} onChange={(e) => setCurrentToken(parseInt(e.target.value) || 1)} />
                        </section>

                        <section className="card">
                            <h3>Doctor Message & Settings</h3>
                            <textarea className="big-textarea" value={adminMessage} onChange={(e) => setAdminMessage(e.target.value)} />
                            <label className="big-toggle">
                                Booking Enabled
                                <input type="checkbox" checked={bookingEnabled} onChange={() => setBookingEnabled(!bookingEnabled)} />
                            </label>
                        </section>
                    </div>
                )}
            </main>
        </div>
    );
};
export default Admin;