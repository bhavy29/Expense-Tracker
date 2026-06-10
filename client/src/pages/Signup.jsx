import React, { useState } from 'react'
import { signup, googleAuth } from '../services/authService'
import { useNavigate, Link } from 'react-router-dom'
import { useGoogleLogin } from "@react-oauth/google";
import './Signup.css'

const Signup = () => {

  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signup(form)
      navigate('/dashboard')
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Something went wrong"
      );
    }
  }

  const responseGoogle = async (authResult) => {
    try {
      if (authResult.code) {
        await googleAuth(authResult.code);
        navigate("/dashboard");
      } else {
        throw new Error("No auth code received");
      }
    } catch (e) {
      console.log("Error while Google Login...", e);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (error) => {
      console.log("Google Login Failed:", error);
    },
    flow: "auth-code",
  });

  return (
    <div className="login-wrapper">
      <div className="glass-card">
        <h2>Create Account</h2>

        <p className="subtitle">
          Enter your details below to create your account
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <i className="fa-solid fa-user"></i>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <i className="fa-solid fa-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <i className="fa-solid fa-lock"></i>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>

        <div className="bottom-text">
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
          <button onClick={googleLogin} className="google-btn">
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  )
}

export default Signup


