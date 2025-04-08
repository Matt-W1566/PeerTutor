import React from 'react'
import './Login.css'

const Messages = () => {
    const styles = {
        loginTitle: {
          fontSize: '3vh',
          color: '#333',
          padding: '16px',
          textAlign: 'center',
          marginTop: '30vh',
        }
      }
    
    return (
        <div style={styles.loginTitle}>
          You have no messages yet.
        </div>
    )
}

export default Messages
