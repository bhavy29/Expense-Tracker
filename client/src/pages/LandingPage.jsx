import React from 'react'
import Navbar from '../components/NavBar/LandingNavbar'
import HeroSection from './HeroSection'
import dashboardPreview from '../assets/dashboard-preview.png'
import analyticsIcon from '../assets/analytics.jpg'
import securityIcon from '../assets/security.jpg'
import './LandingPage.css'

const LandingPage = () => {
    return (
        <div className="landing">

            <Navbar />

            <HeroSection />

            {/* Premium Statement */}

            <section className="headline">

                <p className="mini-title">
                    Simplicity. Intelligence. Control.
                </p>

                <h2>
                    Everything you need
                    to master your money.
                </h2>

                <p>
                    Built with modern technologies and
                    designed to make finance effortless.
                </p>

            </section>

            {/* Huge Dashboard */}

            <section className="dashboard">

                <img src={dashboardPreview} alt="Dashboard preview" />

            </section>

            {/* Feature 1 */}

            <section className="feature-row">

                <div>

                    <span>Analytics</span>

                    <h2>
                        See where every
                        dollar goes.
                    </h2>

                    <p>
                        Beautiful charts transform
                        raw transactions into insights.
                    </p>

                </div>

                <img src={analyticsIcon} alt="Analytics illustration" />

            </section>

            {/* Feature 2 */}

            <section className="feature-row reverse">

                <img src={securityIcon} alt="Security illustration" />

                <div>

                    <span>Security</span>

                    <h2>
                        Your data stays
                        yours.
                    </h2>

                    <p>
                        JWT authentication,
                        encrypted storage and
                        secure architecture.
                    </p>

                </div>

            </section>

            {/* Bento Grid */}

            <section className="bento">

                <div className="large-card">

                    <h3>
                        Smart Reports
                    </h3>

                    <p>
                        Export PDF reports instantly.
                    </p>

                </div>

                <div className="small-card">

                    <h3>
                        Fast
                    </h3>

                </div>

                <div className="small-card">

                    <h3>
                        Responsive
                    </h3>

                </div>

                <div className="wide-card">

                    <h3>
                        Monthly Insights
                    </h3>

                </div>

            </section>

            {/* Numbers */}

            <section className="stats">

                <div>

                    <h1>99.9%</h1>

                    <p>Availability</p>

                </div>

                <div>

                    <h1>256-bit</h1>

                    <p>Encryption</p>

                </div>

                <div>

                    <h1>Redis</h1>

                    <p>Lightning Fast</p>

                </div>

            </section>

            {/* Quote */}

            <section className="quote">

                <h2>

                    "The easiest way
                    to understand
                    your finances."

                </h2>

            </section>

            {/* CTA */}

            <section className="cta">

                <h2>

                    Ready to start?

                </h2>

                <button>

                    Get Started

                </button>

            </section>

            <footer>

                ©2026 Expense Tracker

            </footer>

        </div>
    )
}

export default LandingPage
