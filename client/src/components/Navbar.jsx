import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import avatar from '../assets/avatar.webp'
import logo from '../assets/logo6.png'
import './NavBar.css'
import { logout, getMe } from '../services/authService'

const NavBar = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const [user, setUser] = useState(null)

  const handleLogout = async () => {
    if (!window.confirm('Logout?')) return

    try {
      await logout()
      setOpen(false)
      navigate('/login')
    } catch (error) {
      alert('Logout failed')
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    getMe().then(res => {
      setUser(res.data.user)
    })
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <img src={logo} alt="Logo" onClick={() => navigate('/dashboard')} />
      </div>

      {/* CENTER */}
      <div className="nav-center">
        <Link to="/dashboard">Overview</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/addnew">Add Transaction</Link>
        <Link to="/reports">Analytics</Link>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <div className="nav-actions">
          <button title="Settings" onClick={() => navigate('/settings')}>⚙️</button>
          <button title="Help" onClick={() => navigate('/help')}>❓</button>
        </div>

        <div className="profile-menu" ref={menuRef}>
          <img src={user?.image || avatar} alt="profile" onClick={() => setOpen(!open)} />

          {open && (
            <div className="dropdown">
              <button onClick={() => navigate('/profile')}>👤 Profile</button>
              <button onClick={() => navigate('/settings')}>⚙️ Settings</button>
              <button onClick={() => navigate('/help')}>❓ Help</button>
              <hr />
              <button className="danger" onClick={handleLogout}>
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar