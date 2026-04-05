import React, { useState } from "react";
import "./dashboard.css";
import Header from "./Header";
import AdminLogin from "./AdminLogin";
import Admin from "./Admin";
import TrackBooking from "./TrackBooking";
import Footer from "./Footer";
const Dashboard = () => {

    const cities = ["Varanasi", "Delhi"];

    const doctorsData = {

        Varanasi: [
            {
                id: 1,
                name: "Dr Amit Sharma",
                hospital: "Heritage Hospital",
                address: "Lanka",
                hospitalNumber: "HH001"
            }
        ],

        Delhi: [
            {
                id: 2,
                name: "Dr Raj Verma",
                hospital: "Apollo Hospital",
                address: "Delhi NCR",
                hospitalNumber: "AP001"
            }
        ]

    };

    const [step, setStep] = useState("select");
    const [selectedCity, setSelectedCity] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const [patients, setPatients] = useState([]);
    const [pending, setPending] = useState([]);

    const [currentToken, setCurrentToken] = useState(1);

    const [patient, setPatient] = useState({});
    const [token, setToken] = useState(null);

    const [adminHospital, setAdminHospital] = useState(null);

    const [bookingEnabled, setBookingEnabled] = useState(true);
    const [adminMessage, setAdminMessage] = useState("डॉकसर्वो में आपका स्वागत है⏳ अब घंटों का इंतज़ार हुआ खत्म! 📲 डॉकसर्वो अपनाइए और अपना टोकन नंबर पाइए। कृपया ध्यान दें, अपने टोकन नंबर की बारी आने से 10 मिनट पहले अवश्य पहुँचें। धन्यवाद!");

    const handleCityChange = (e) => {
        const city = e.target.value;
        setSelectedCity(city);
        setDoctors(doctorsData[city] || []);
    };

    const handleDoctorSelect = (e) => {
        const doc = doctors.find(d => d.id === Number(e.target.value));
        setSelectedDoctor(doc);
        setStep("doctor");
    };

    const bookAppointment = () => {

        if (!bookingEnabled) {
            alert("Booking currently closed");
            return;
        }

        const hospital = selectedDoctor.hospitalNumber;

        const hospitalPending = pending.filter(p => p.hospital === hospital);
        const hospitalPatients = patients.filter(p => p.hospital === hospital);

        const newToken = hospitalPending.length + hospitalPatients.length + 1;

        const request = {
            ...patient,
            token: newToken,
            hospital: hospital,
            status: "pending"
        };

        setPending([...pending, request]);
        setToken(newToken);
        setStep("success");

    };

    if (step === "adminLogin") {
        return (
            <AdminLogin
                setAdminHospital={setAdminHospital}
                setStep={setStep}
            />
        )
    }

    if (step === "admin") {
        return (

            <Admin
                patients={patients}
                setPatients={setPatients}
                pending={pending}
                setPending={setPending}
                hospital={adminHospital}
                currentToken={currentToken}
                setCurrentToken={setCurrentToken}
                bookingEnabled={bookingEnabled}
                setBookingEnabled={setBookingEnabled}
                adminMessage={adminMessage}
                setAdminMessage={setAdminMessage}
                logout={() => setStep("select")}
            />

        )
    }

    if (step === "track") {
        return (
            <TrackBooking
                patients={patients}
                pending={pending}
                currentToken={currentToken}
                goBack={() => setStep("select")}
            />
        )
    }
const handleHeaderClick=(e)=>{
    setStep(e)
}
    return (

        <div className="container">

          
<Header handleHeaderNav={(e)=>handleHeaderClick(e)}/>
            <div className="marquee">
                <span>{adminMessage}</span>
            </div>

            <div className="center-box">

                <select onChange={handleCityChange}>
                    <option>Select City</option>

                    {cities.map((city, i) => (
                        <option key={i}>{city}</option>
                    ))}

                </select>

                {doctors.length > 0 && (

                    <select onChange={handleDoctorSelect}>
                        <option>Select Doctor</option>

                        {doctors.map(doc => (
                            <option key={doc.id} value={doc.id}>
                                {doc.name}
                            </option>
                        ))}

                    </select>

                )}

            </div>

            {step === "doctor" && selectedDoctor && (

                <div className="card">

                    <h2>{selectedDoctor.name}</h2>

                    <p>{selectedDoctor.hospital}</p>

                    <p className="token">
                        Current Token : {currentToken}
                    </p>
{bookingEnabled &&
                    <button
                       
                        onClick={() => setStep("form")}
                    >
                        Book Appointment
                    </button>}

                    <button
                        className="track-btn"
                        onClick={() => setStep("track")}
                    >
                        Track Booking
                    </button>

                </div>

            )}

            {step === "form" && (

                <div className="card">

                    <input
                        placeholder="Name"
                        onChange={(e) => setPatient({ ...patient, name: e.target.value })}
                    />

                    <input
                        placeholder="Mobile"
                        onChange={(e) => setPatient({ ...patient, mobile: e.target.value })}
                    />

                    <button onClick={bookAppointment}>
                        Submit
                    </button>

                </div>

            )}

            {step === "success" && (

                <div className="card">

                    <h3>Booking Sent</h3>
                    <p>Your Token : {token}</p>

                </div>

            )}
            <Footer/>

        </div>

    )

};

export default Dashboard;