import React, { useState, useEffect } from 'react';
import { isCollision } from '../utils/collision';
import '../App.css';

const Star = ({ aircraftPosition, handleStarCollected, isPaused }) => {
  const [starPosition, setStarPosition] = useState({
    top: -50, // Start from off-screen at the top
    left: Math.random() * (window.innerWidth - 50), // Randomize the initial horizontal position
  });

  // Function to reset the star to the top at a new random horizontal position
  const resetStarPosition = () => {
    setStarPosition({
      top: -50,  // Start again from above the screen
      left: Math.random() * (window.innerWidth - 50), // Randomize the left position
    });
  };

  // Move the star downward in intervals
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setStarPosition((prevPosition) => ({
          ...prevPosition,
          top: prevPosition.top + 3, // Move the star downward by 3 pixels
        }));
      }, 50); // Update every 50ms for a smooth animation

      // Reset star when it reaches the bottom of the screen
      if (starPosition.top > window.innerHeight) {
        resetStarPosition(); // Reset position to the top
      }

      return () => clearInterval(interval);
    }
  }, [isPaused, starPosition]);

  // Check if the aircraft has collected the star
  useEffect(() => {
    if (!isPaused) {
      const aircraftRect = {
        left: aircraftPosition.left,
        right: aircraftPosition.left + 100,
        top: aircraftPosition.top,
        bottom: aircraftPosition.top + 100,
      };

      const starRect = {
        left: starPosition.left,
        right: starPosition.left + 50,
        top: starPosition.top,
        bottom: starPosition.top + 50,
      };

      if (isCollision(aircraftRect, starRect)) {
        handleStarCollected(); // Notify that a star has been collected
        resetStarPosition(); // Move star to the top again
      }
    }
  }, [aircraftPosition, starPosition, handleStarCollected, isPaused]);

  return (
    <div
      className="star"
      style={{
        position: 'absolute',
        top: `${starPosition.top}px`,
        left: `${starPosition.left}px`,
        width: '50px',
        height: '50px',
      }}
    >
      ⭐
    </div>
  );
};

export default Star;
