import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo6.png'

import './NavBar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
        {/* LEFT */}
      <div className="nav-left">
        <img src={logo} alt="Logo" onClick={() => navigate('/dashboard')} />
      </div>
      <div className="nav-center">
        <NavLink to="/features" className="nav-link">
          Features
        </NavLink>
        <NavLink to="/how-it-works" className="nav-link">
          How It Works
        </NavLink>
        <NavLink to="/get-started" className="nav-link">
          Get Started
        </NavLink>
        <NavLink to="/about" className="nav-link">
          About
        </NavLink>
        <NavLink to="/login" className="nav-link">
          Login
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;