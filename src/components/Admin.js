import React, { useState } from "react";
import "./admin.css";

const Admin = ({
    patients,
    setPatients,
    pending,
    setPending,
    hospital,
    currentToken,
    setCurrentToken,
    bookingEnabled,
    setBookingEnabled,
    adminMessage,
    setAdminMessage,
    logout
}) => {

    const [activeTab, setActiveTab] = useState("booking");

    const hospitalPending = pending.filter(p => p.hospital === hospital);
    const hospitalPatients = patients.filter(p => p.hospital === hospital);

    const confirmPatient = (p) => {
        const confirmed = { ...p, status: "waiting" };
        setPatients([...patients, confirmed]);
        setPending(pending.filter(x => x !== p));
    };

    const markVisited = (token) => {

        const updated = patients.map(p => {

            if (p.token === token && p.hospital === hospital) {
                return { ...p, status: "checked" }
            }

            return p;

        });

        setPatients(updated);

    };

    const checked = hospitalPatients.filter(p => p.status === "checked").length;
    const total = hospitalPatients.length + hospitalPending.length;

    return (

        <div className="admin-container">

            {/* HEADER */}

            <div className="admin-header">

                <h2 className="dashboard-title">DocServo Admin</h2>

                <button className="power-btn" onClick={logout}>
                    ⏻
                </button>

            </div>

            {/* ACTION BUTTONS */}

            <div className="admin-actions">

                <button onClick={() => setActiveTab("booking")}>Booking</button>

                <button onClick={() => setActiveTab("pending")}>
                    Pending ({hospitalPending.length})
                </button>

                <button onClick={() => setActiveTab("queue")}>Queue</button>

                <button onClick={() => setActiveTab("stats")}>Stats</button>

            </div>

            {/* DYNAMIC CONTENT AREA */}

            <div className="admin-content">

                {activeTab === "booking" && (

                    <div className="admin-card">

                        <label>

                            Booking Enabled

                            <input
                                type="checkbox"
                                checked={bookingEnabled}
                                onChange={() => setBookingEnabled(!bookingEnabled)}
                            />

                        </label>

                        <input
                            placeholder="Doctor message"
                            value={adminMessage}
                            onChange={(e) => setAdminMessage(e.target.value)}
                        />

                    </div>

                )}

                {activeTab === "stats" && (

                    <div className="stats">

                        <div>Total {total}</div>
                        <div>Checked {checked}</div>
                        <div>Pending {hospitalPending.length}</div>

                    </div>

                )}

                {activeTab === "pending" && (

                    <div className="admin-card">

                        <h3>Pending Requests</h3>

                        {hospitalPending.map((p, i) => (

                            <div className="pending-row" key={i}>

                                <span>
                                    Token {p.token} - {p.name}
                                </span>

                                <button
                                    className="confirm-btn"
                                    onClick={() => confirmPatient(p)}
                                >
                                    Confirm
                                </button>

                            </div>

                        ))}

                    </div>

                )}

                {activeTab === "queue" && (

                    <div className="admin-card">

                        <h3>Queue</h3>

                        {hospitalPatients.map((p, i) => (

                            <div className="patient-row" key={i}>

                                <span>{p.token}</span>
                                <span>{p.name}</span>
                                <span>{p.status}</span>

                                {p.status !== "checked" && (

                                    <button onClick={() => markVisited(p.token)}>
                                        Visited
                                    </button>

                                )}

                            </div>

                        ))}

                    </div>

                )}

            </div>

            {/* TOKEN PANEL */}

            <div className="token-panel">

                <h3>Update Token</h3>

                <div className="token-grid">

                    {Array.from({ length: 100 }, (_, i) => {

                        const t = i + 1;

                        return (

                            <button
                                key={i}
                                className={currentToken === t ? "token-active" : "token-btn"}
                                onClick={() => setCurrentToken(t)}
                            >
                                {t}
                            </button>

                        )

                    })}

                </div>

            </div>

        </div>

    );

};

export default Admin;