import { useNavigate } from "react-router-dom";
import "./HeroSection.css";
import logo from "../assets/logo6.png";

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section className="hero">

            <div className="hero-content">

                {/* LEFT ICON */}
                <div className="hero-icon">
                    <img src={logo} alt="app logo" />
                </div>

                {/* TEXT */}
                <div className="hero-text">
                    <h1>ExpenseX</h1>
                    <h2>Expense Manager App</h2>
                    <p>
                        Manage your personal finances and easily track your money,
                        expenses and budget
                    </p>
                </div>

            </div>

            <hr />

            {/* CTA SECTION */}
            <div className="hero-cta">
                <p>Start managing your expenses in seconds</p>

                <div className="buttons">

                    <button onClick={() => navigate("/signup")} className="primary-btn">
                        Start Tracking
                    </button>

                    <button className="secondary-btn">
                        See How It Works
                    </button>

                </div>
            </div>

        </section>
    );
};

export default HeroSection;