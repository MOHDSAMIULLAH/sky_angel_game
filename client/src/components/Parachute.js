// src/Parachute.js
import React, { useState, useEffect } from 'react';
import { isCollision } from '../utils/collision';
import parachuteImage from '../assets/parachute.png'; 
import achievementSound from '../assets/achievement.mp3';
import '../App.css';

let bonusSound = new Audio(achievementSound);

const Parachute = ({ aircraftPosition, setFuel, fuel, isPaused }) => {
  const [parachutePosition, setParachutePosition] = useState({ 
    top: 0, 
    left: Math.random() * 1024 
  });

  // Animate parachute drop
  useEffect(() => {
    const parachuteInterval = setInterval(() => {
      if (!isPaused) {
        setParachutePosition((prevPos) => ({
          ...prevPos,
          top: prevPos.top + 5,
        }));

        // Reset parachute when it drops off-screen
        if (parachutePosition.top > 768) {
          setParachutePosition({ top: 0, left: Math.random() * 1024 });
        }
      }
    }, 100);

    return () => clearInterval(parachuteInterval);
  }, [parachutePosition, isPaused]);

  // Check if the parachute is collected by the aircraft
  useEffect(() => {
    const aircraftRect = {
      left: aircraftPosition.left,
      right: aircraftPosition.left + 100,
      top: aircraftPosition.top,
      bottom: aircraftPosition.top + 100,
    };
    const parachuteRect = {
      left: parachutePosition.left,
      right: parachutePosition.left + 50,
      top: parachutePosition.top,
      bottom: parachutePosition.top + 50,
    };

    if (isCollision(aircraftRect, parachuteRect)) {
      bonusSound.play()
      setFuel(fuel + 10); // Replenish fuel by 10
      setParachutePosition({ top: 0, left: Math.random() * 1024 }); // Reset parachute position
    }
  }, [aircraftPosition, parachutePosition, setFuel, fuel]);

  return (
    <div 
      className="parachute" 
      style={{ 
        top: `${parachutePosition.top}px`, 
        left: `${parachutePosition.left}px`,
        position: 'absolute',  
        width: '50px', 
        height: 'auto' 
      }}
    >
      <img 
        src={parachuteImage} 
        alt="parachute" 
        style={{ 
          width: '100%', 
          height: 'auto' 
        }} 
      />
    </div>
  );
};

export default Parachute;
