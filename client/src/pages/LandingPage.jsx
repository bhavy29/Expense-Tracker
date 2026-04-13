import Navbar from "../components/NavBar/LandingNavbar";
import HeroSection from "./HeroSection";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing">

      <Navbar />

      {/* HERO */}
      <HeroSection />

      {/* FEATURES */}
      <section id="features" className="features">
        <h2>Features</h2>

        <div className="feature-container">
          <div className="card">
            <h3>📊 Analytics</h3>
            <p>Understand where your money goes.</p>
          </div>

          <div className="card">
            <h3>🔔 Smart Alerts</h3>
            <p>Get notified on overspending.</p>
          </div>

          <div className="card">
            <h3>📱 Responsive</h3>
            <p>Use on mobile, tablet, desktop.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="how">
        <h2>How It Works</h2>

        <div className="steps">
          <div className="step">1️⃣ Add Expenses</div>
          <div className="step">2️⃣ Analyze Spending</div>
          <div className="step">3️⃣ Save Money</div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="cta">
        <h2>Start Managing Your Money 🚀</h2>
        <button className="btn">Get Started Free</button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 Expense Tracker | Built by Bhavy</p>
      </footer>

    </div>
  );
};

export default LandingPage;