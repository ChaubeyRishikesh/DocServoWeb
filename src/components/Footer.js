import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          {/* Branding */}
          <div className="footer-section">
            <h2 className="footer-logo">DocServo</h2>
            <p className="footer-tagline">Live doctor token tracking</p>
          </div>

          {/* Links */}
          <div className="footer-section">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/doctors">Doctors</a>
              </li>
              <li>
                <a href="/cities">Cities</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <ul>
              <li>support@docservo.com</li>
              <li>Privacy</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">© {currentYear} DocServo</div>
      </footer>

      <style>{`
        .footer {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background-color: #0f172a;
          color: #e2e8f0;
          padding: 10px 10px 5px;
          font-family: Arial, sans-serif;
          box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.3);
          z-index: 1000;
        }

        .footer-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          max-width: 900px;
          margin: auto;
        }

        .footer-section {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .footer-logo {
          font-size: 14px;
          margin: 0;
          color: #38bdf8;
        }

        .footer-tagline {
          font-size: 10px;
          margin: 0;
          color: #94a3b8;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .footer-section ul li {
          font-size: 10px;
        }

        .footer-section ul li a {
          color: #e2e8f0;
          text-decoration: none;
        }

        .footer-section ul li a:hover {
          color: #38bdf8;
        }

        .footer-bottom {
          text-align: center;
          margin-top: 5px;
          font-size: 10px;
          color: #94a3b8;
        }
      `}</style>
    </>
  );
};

export default Footer;