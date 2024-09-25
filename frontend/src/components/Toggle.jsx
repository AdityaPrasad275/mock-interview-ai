import React, { useState } from 'react';

function ToggleCard({ title, content, visible = false }) {
  const [isVisible, setIsVisible] = useState(visible);

  // Inline styles
  const styles = {
    toggleCard: {
      border: '1px solid #ccc',
      padding: '10px',
      marginBottom: '10px',
      cursor: 'pointer',
    },
    title: {
      fontWeight: 'bold',
    },
    content: {
      marginTop: '10px',
    },
    animation: {
      transform: 'rotate(360deg)',
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div style={styles.toggleCard}>
      <div style={styles.title} onClick={toggleVisibility}>
        {title}
      </div>
      {isVisible && <div style={styles.content}>{content}</div>}
    </div>
  );
}

export default ToggleCard;