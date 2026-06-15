import React, { useState } from "react";
import axios from 'axios';
import "./dashboard.css";
import Header from "./Header";
import AdminLogin from "./AdminLogin";
import Admin from "./Admin";
import TrackBooking from "./TrackBooking";
import Footer from "./Footer";

const Dashboard = () => {
    const cities = ["Varanasi", "Delhi"];
    const [step, setStep] = useState("select");
    const [selectedCity, setSelectedCity] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [patients, setPatients] = useState([]);
    const [pending, setPending] = useState([]);
    const [currentToken, setCurrentToken] = useState(1);
    const [patient, setPatient] = useState({ name: "", mobile: "" });
    const [token, setToken] = useState(null);
    const [adminHospital, setAdminHospital] = useState(null);
    const [bookingEnabled, setBookingEnabled] = useState(true);
    const [adminMessage, setAdminMessage] = useState("Welcome to DocServo! Please ensure you arrive 10 minutes before your token time.");

    const handleCityChange = (e) => {
        const city = e.target.value;
        axios.get(`http://localhost:5000/docservo/doctorsList/${city}`)
            .then(res => setDoctors(res.data || []));
        setSelectedCity(city);
    };

    const handleDoctorSelect = (e) => {
        const doc = doctors.find(d => d.id == e.target.value);
        setSelectedDoctor(doc);
        setStep("doctor");
    };

    const bookAppointment = () => {
        if (!bookingEnabled) return alert("Booking currently closed");
        if (!patient.name.trim() || !patient.mobile.trim()) return alert("Please enter full name and mobile number.");
        const newToken = pending.length + patients.length + 1;
        setPending([...pending, { ...patient, token: newToken, hospital: selectedDoctor.id, status: "pending" }]);
        setToken(newToken);
        setStep("success");
    };

    // Routing Logic
    if (step === "adminLogin") return <AdminLogin setAdminHospital={setAdminHospital} setStep={setStep} />;
    if (step === "admin") return <Admin patients={patients} setPatients={setPatients} pending={pending} setPending={setPending} hospital={adminHospital} currentToken={currentToken} setCurrentToken={setCurrentToken} bookingEnabled={bookingEnabled} setBookingEnabled={setBookingEnabled} adminMessage={adminMessage} setAdminMessage={setAdminMessage} logout={() => setStep("select")} />;
    if (step === "track") return <TrackBooking patients={patients} pending={pending} currentToken={currentToken} goBack={() => setStep("select")} />;

    return (
        <div className="container">
            <Header handleHeaderNav={(e) => setStep(e)} />
            
            <div className="marquee">
                <p>{adminMessage}</p>
            </div>

            <main className="main-content">
                <div className="selection-box">
                    <select onChange={handleCityChange}>
                        <option>Select City</option>
                        {cities.map((city, i) => <option key={i} value={city}>{city}</option>)}
                    </select>

                    {doctors.length > 0 && (
                        <select onChange={handleDoctorSelect}>
                            <option>Select Doctor</option>
                            {doctors.map(doc => <option key={doc.id} value={doc.id}>{doc.doctorName}</option>)}
                        </select>
                    )}
                </div>

                {step === "doctor" && selectedDoctor && (
                    <div className="card">
                        <h2>{selectedDoctor.doctorName}</h2>
                        <p className="doctor-meta">{selectedDoctor.doctorDegree}</p>
                        <div className="hospital-info">
                            <p className="hosp-name">{selectedDoctor.hospitalName}</p>
                            <p>{selectedDoctor.hospitalMessage}</p>
                        </div>
                        <div className="token-highlight">
                            <span>Current Serving Token</span>
                            <strong>{selectedDoctor.currentToken}</strong>
                        </div>
                        {selectedDoctor.bookingEnabled && (
                            <button className="btn-primary" onClick={() => setStep("form")}>Book Appointment</button>
                        )}
                        <button className="btn-secondary" onClick={() => setStep("track")}>Track My Booking</button>
                    </div>
                )}

                {step === "form" && (
                    <div className="card">
                        <h3>Patient Details</h3>
                        <input placeholder="Full Name" onChange={(e) => setPatient({...patient, name: e.target.value})} />
                        <input placeholder="Mobile Number" onChange={(e) => setPatient({...patient, mobile: e.target.value})} />
                        <button className="btn-primary" onClick={bookAppointment}>Confirm Booking</button>
                    </div>
                )}
                {step === "success" && (
                    <div className="card">
                        <h3>Booking Confirmed</h3>
                        <p>Your appointment has been successfully booked.</p>
                        <div className="token-highlight">
                            <span>Booking ID</span>
                            <strong>{token}</strong>
                        </div>
                        {selectedDoctor && (
                            <>
                                <p><strong>Doctor:</strong> {selectedDoctor.doctorName}</p>
                                <p><strong>Hospital:</strong> {selectedDoctor.hospitalName}</p>
                            </>
                        )}
                        <button className="btn-primary" onClick={() => {
                            setStep("select");
                            setPatient({ name: "", mobile: "" });
                            setSelectedDoctor(null);
                            setDoctors([]);
                            setSelectedCity("");
                        }}>
                            Back to Home
                        </button>
                        <button className="btn-secondary" onClick={() => setStep("track")}>Track My Booking</button>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;