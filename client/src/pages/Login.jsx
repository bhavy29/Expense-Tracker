import { useState } from 'react'
import { login, googleAuth } from '../services/authService'
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate, Link } from 'react-router-dom'
import './Login.css'

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChanges = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      await login(form)
      // if (res.status === 200) {
      navigate('/dashboard')
      // }
    } catch (err) {
      setError('Invalid email or password')
    }
  }

  // Google Login
  const responseGoogle = async (authResult) => {
    try {
      if (authResult.code) {
        const result = await googleAuth(authResult.code);
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
        <h2>Welcome Back</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <i className="fa-solid fa-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              onChange={handleChanges}
              required
            />
          </div>

          <div className="input-box">
            <i className="fa-solid fa-lock"></i>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChanges}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="btn">Login</button>
        </form>

        <div className="bottom-text">
          <p>
            Don't have an account? <Link to="/signup">Create Now</Link>
          </p>

          <button onClick={googleLogin} className="google-btn">
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
