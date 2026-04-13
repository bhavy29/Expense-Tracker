import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar/DashboardNavbar'
import { getMe } from '../services/authService'
import { deleteUser } from '../services/user'
import avatar from '../assets/avatar.webp'
import './Profile.css'

const Profile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    getMe().then(res => {
      setUser(res.data.user)
    })
  }, [])

  if (!user) return <p className="loading">Loading profile...</p>

  const deleteAccount = async () => {
    try {
      const result = window.confirm('Are you sure you want to delete your account? This action cannot be undone.')
      if (!result) return  
      await deleteUser()
      navigate('/login')
    
    } catch (err) {
      alert('Error deleting account. Please try again.')
    }
  }

  return (
    <>
      <NavBar />

      <div className="profile-page">

        {console.log(user)}
        {/* HEADER */}
        <div className="profile-header">
          <img src={user?.image} alt="User Avatar" />
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>

        {/* DETAILS */}
        <div className="profile-card">

          <h3>Account Information</h3>

          <div className="profile-row">
            <span>Full Name</span>
            <span>{user.name}</span>
          </div>

          <div className="profile-row">
            <span>Email</span>
            <span>{user.email}</span>
          </div>

          <div className="profile-row">
            <span>Account Created</span>
            <span>
              {new Date(user.createdAt).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>

        </div>

        {/* ACTIONS */}
        <div className="profile-actions">
          <button className="primary" onClick={() => navigate('/updateprofile')}>Edit Profile</button>
          <button className="danger" onClick={deleteAccount}>Delete Account</button>
        </div>

      </div>
    </>
  )
}

export default Profile
