// Logout.jsx
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/Authcontext';

function Logout() {
  const navigate = useNavigate();
  const { setAuthenticates } = useAuth();
  const [showConfirmation, setShowConfirmation] = useState(true);
  const [status, setStatus] = useState('idle'); // 'idle', 'loggingOut', 'success', 'error'

  const handleLogout = async () => {
    setStatus('loggingOut');
    try {
      const token = localStorage.getItem('access');
      
      if (token) {
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        
        await axios.post('http://127.0.0.1:8000/api/user/logout/', null, config);
      }
      
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      setAuthenticates(false);
      setStatus('success');
      
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      
    } catch (error) {
      console.error('Logout failed:', error);
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      setAuthenticates(false);
      setStatus('error');
      
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  if (status === 'loggingOut') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Logging Out...</h2>
          <div style={styles.spinner}></div>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Logged Out Successfully</h2>
          <p style={styles.message}>You have been securely logged out. We hope to see you again soon!</p>
          <div style={styles.checkmark}>&#10003;</div>
        </div>
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Confirm Logout</h2>
          <p style={styles.message}>Are you sure you want to log out?</p>
          
          <div style={styles.buttonGroup}>
            <button 
              onClick={handleLogout} 
              style={{ ...styles.button, ...styles.primaryButton }}
            >
              Yes, Logout
            </button>
            <button 
              onClick={handleCancel} 
              style={{ ...styles.button, ...styles.secondaryButton }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '20px',
    boxSizing: 'border-box'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
    padding: '40px',
    textAlign: 'center',
    maxWidth: '450px',
    width: '100%',
    transition: 'all 0.3s ease'
  },
  title: {
    color: '#2c3e50',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: '600'
  },
  message: {
    color: '#7f8c8d',
    marginBottom: '30px',
    fontSize: '16px',
    lineHeight: '1.5'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '20px'
  },
  button: {
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minWidth: '120px'
  },
  primaryButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
  },
  secondaryButton: {
    backgroundColor: '#f1f1f1',
    color: '#34495e',
  },
  spinner: {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderLeftColor: '#e74c3c',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
    margin: '0 auto',
  },
  checkmark: {
    color: '#2ecc71',
    fontSize: '60px',
    lineHeight: '60px',
    margin: '20px auto',
    animation: 'fadeIn 0.5s ease'
  },
  '@keyframes spin': {
    to: { transform: 'rotate(360deg)' }
  },
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 }
  }
};

// Add hover effects
styles.primaryButton[':hover'] = {
  backgroundColor: '#c0392b',
  transform: 'translateY(-2px)'
};
styles.secondaryButton[':hover'] = {
  backgroundColor: '#e0e0e0',
  transform: 'translateY(-2px)'
};

export default Logout;