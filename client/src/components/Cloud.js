// src/Cloud.js
import React, { useState, useEffect } from 'react';
import '../styles/Cloud.css';
import cloud from '../assets/cloud1.png'; 

const Cloud = ({ isPaused }) => {
 // Initialize random positions for each cloud
 const [position, setPosition] = useState({
    top: Math.random() * 300,  // Random y position (vertical)
    left: window.innerWidth + Math.random() * 500, // Random starting x (slightly beyond screen)
  });

  // Move the cloud from right to left
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setPosition((prevPosition) => ({
          top: prevPosition.top,
          left: prevPosition.left - 3, 
        }));
      }
    }, 50); // Speed of the cloud's movement

    // Reset cloud position if it moves off-screen
    if (position.left < -200) {
      setPosition({
        top: Math.random() * 300, // Random new y position
        left: window.innerWidth + Math.random() * 500, // Start again from the right
      });
    }

    return () => clearInterval(interval);
  }, [isPaused, position]);

  return (
    <div className="cloud" style={{ top: position.top, left: position.left }}>
      <img src={cloud} alt="cloud" />
    </div>
  );
};

export default Cloud;
