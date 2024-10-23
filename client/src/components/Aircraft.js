import React, { useEffect } from 'react';
import '../App.css';

const Aircraft = ({ position, setPosition, isPaused }) => {
  const moveAircraft = (e) => {
    if (isPaused) return; // Prevent movement when paused

    const step = 10; // Set the step size for movement
    const newPosition = { ...position };

    switch (e.key) {
      case 'ArrowUp':
        newPosition.top = Math.max(0, position.top - step); // Prevent going out of the top boundary
        break;
      case 'ArrowDown':
        newPosition.top = Math.min(768 - 100, position.top + step); // Prevent going out of the bottom boundary
        break;
      case 'ArrowLeft':
        newPosition.left = Math.max(0, position.left - step); // Prevent going out of the left boundary
        break;
      case 'ArrowRight':
        newPosition.left = Math.min(1024 - 100, position.left + step); // Prevent going out of the right boundary
        break;
      default:
        break;
    }

    setPosition(newPosition);
  };

  useEffect(() => {
    const handleKeydown = (e) => {
      moveAircraft(e);
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [position, isPaused]);

  return (
    <div
      className="aircraft"
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: '100px',  
        height: '100px',
      }}
    >
      ✈️
    </div>
  );
};

export default Aircraft;
