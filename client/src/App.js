// src/App.js
import React, { useState, useEffect } from "react";
import Aircraft from "./components/Aircraft.js";
import Bird from "./components/Bird.js";
import Parachute from "./components/Parachute.js";
import Star from "./components/Star.js";
import GameOver from "./components/GameOver.js";
import collectSound from './assets/bonus.mp3';
import lose from './assets/lose.mp3';
import spaceStation from './assets/bgm.mp3';
import Cloud from "./components/Cloud.js";
import "./App.css";

let bonusSound = new Audio(collectSound);
let loseSound = new Audio(lose);
const gameSound = new Audio(spaceStation);

const App = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [fuel, setFuel] = useState(10);
  const [time, setTime] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [starsCollected, setStarsCollected] = useState(0);

  const [aircraftPosition, setAircraftPosition] = useState({
    top: 300,
    left: 400,
  });
  const [isPaused, setIsPaused] = useState(false);

  // Define the number of each object
  const numBirds = 5; // Number of birds
  const numStars = 5; // Number of stars
  const numParachutes = 3; // Number of parachutes
  const numClouds = 6; // Number of parachutes

  // Pause/Resume the game
  const togglePause = () => {
    setIsPaused(!isPaused);
    if(isPaused) {
      gameSound.play()
    } else {
      gameSound.pause()
    }

  };
  // Pause/Resume with the space bar
  useEffect(() => {
    const handleSpacebar = (e) => {
      if (e.code === "Space") {
        e.preventDefault();  // Prevent default space bar action (scrolling)
        togglePause();
      }
    };

    window.addEventListener("keydown", handleSpacebar);
    return () => {
      window.removeEventListener("keydown", handleSpacebar);
    };
  }, [isPaused]);
  
  // Timer for fuel depletion and time count
  useEffect(() => {
    let timer;
    if (isGameStarted && !isPaused && !isGameOver) {
      timer = setInterval(() => {
        setFuel((fuel) => fuel - 1);
        setTime((time) => time + 1);
      }, 1000);
    }

    if (fuel <= 0 && !isGameOver) {
      handleGameOver();
    }

    return () => clearInterval(timer);
  }, [isGameStarted, isPaused, isGameOver, fuel]);

  // Start the game
  const startGame = () => {
    gameSound.play()
    setIsGameStarted(true);
    setFuel(10);
    setTime(0);
    setStarsCollected(0);
    setIsGameOver(false);
  };

  // Restart the game
  const restartGame = () => {
    startGame();
    setAircraftPosition({ top: 300, left: 400 });
  };

  const handleGameOver = () => {
    loseSound.play();
    gameSound.pause()
    setIsGameOver(true);
  };

  const handleStarCollected = () => {
    bonusSound.play();
    setStarsCollected(starsCollected + 1);
  };

  return (
    <div className="game-container">
      {!isGameOver && (
        <button className="pause-button" onClick={togglePause}>
          {isPaused ? "Resume" : "Pause"}
        </button>
      )}
      {!isGameStarted && !isGameOver && (
        <button className="start-button" onClick={startGame}>
          Start Game
        </button>
      )}

      {isGameStarted && !isGameOver && (
        <>
          <div className="hud">
            <p>Fuel: {fuel}</p>
            <p>Time: {time}s</p>
            <p>Stars: {starsCollected}</p>
          </div>
          <Aircraft
            position={aircraftPosition}
            setPosition={setAircraftPosition}
            isPaused={isPaused}
          />

          {/* Render multiple birds */}
          {Array.from({ length: numBirds }, (_, index) => (
            <Bird
              key={index}
              handleGameOver={handleGameOver}
              isPaused={isPaused}
              aircraftPosition={aircraftPosition}
            />
          ))}

          {/* Render multiple parachutes */}
          {Array.from({ length: numParachutes }, (_, index) => (
            <Parachute
              key={index}
              setFuel={setFuel}
              fuel={fuel}
              isPaused={isPaused}
              aircraftPosition={aircraftPosition}
            />
          ))}

          {/* Render multiple stars */}
          {Array.from({ length: numStars }, (_, index) => (
            <Star
              key={index}
              handleStarCollected={handleStarCollected}
              isPaused={isPaused}
              aircraftPosition={aircraftPosition}
            />
          ))}

           {/* Render clouds */}
           {Array.from({ length: numClouds }, (_, index) => (
            <Cloud key={index} isPaused={isPaused} />
          ))}

        </>
      )}

      {isGameOver && (
        <>
          <GameOver stars={starsCollected} time={time} />
          <button className="restart-button" onClick={restartGame}>
            Start Game
          </button>
        </>
      )}
    </div>
  );
};

export default App;
