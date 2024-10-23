// src/Bird.js
import React, { useState, useEffect } from "react";
import { isCollision } from "../utils/collision";
import "../App.css";
import bird from '../assets/bird.png';

const Bird = ({ handleGameOver, aircraftPosition, isPaused }) => {
  const [birdPosition, setBirdPosition] = useState({
    top: Math.random() * 768,
    left: 1024 + Math.random() * 200,
  });

  // Move bird from right to left
  useEffect(() => {
    const birdInterval = setInterval(() => {
      if (!isPaused) {
        setBirdPosition((prevPos) => ({
          ...prevPos,
          left: prevPos.left - 5,
        }));

        if (birdPosition.left < -100) {
          setBirdPosition({ top: Math.random() * 768, left: 1024 });
        }
      }
    }, 100);

    return () => clearInterval(birdInterval);
  }, [birdPosition,isPaused]);

  // Check for collision with aircraft
  useEffect(() => {
    const aircraftRect = {
      left: aircraftPosition.left + 10,  // Adjust left boundary
      right: aircraftPosition.left + 50, // Adjust right boundary
      top: aircraftPosition.top + 10,    // Adjust top boundary
      bottom: aircraftPosition.top + 50, // Adjust bottom boundary
    };
    const birdRect = {
      left: birdPosition.left + 10,      // Adjust left boundary
      right: birdPosition.left + 50,     // Adjust right boundary
      top: birdPosition.top + 10,        // Adjust top boundary
      bottom: birdPosition.top + 50,     // Adjust bottom boundary
    };

    if (isCollision(aircraftRect, birdRect)) {
      handleGameOver(); 
    }
  }, [aircraftPosition, birdPosition, handleGameOver]);

  return (
     <div 
     className="bird" 
     style={{ 
       top: `${birdPosition.top}px`, 
       left: `${birdPosition.left}px`,
       position: 'absolute',  
       width: '50px', 
       height: 'auto' 
     }}
   >
     <img 
       src={bird} 
       alt="bird" 
       style={{ 
         width: '100%', 
         height: 'auto' 
       }} 
     />
   </div>
  );
};

export default Bird;
