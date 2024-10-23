// src/GameOver.js
import React, { useState } from 'react';

const GameOver = ({ stars, time }) => {
    const [userName, setUserName] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [ranking, setRanking] = useState([]);
    console.log("ranking",ranking);
  
    const handleSubmit = async () => {
      if (userName) {
        const payload = { name: userName, time, stars };
        try {
          const response = await fetch('https://sky-angel-game.onrender.com/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          const data = await response.json();
          setRanking(data); 
          setIsSubmitted(true);
        } catch (error) {
          console.error('Error submitting score:', error);
        }
      }
    };
  
    return (
      <div className="game-over">
        <h2>Game Over</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={handleSubmit} disabled={!userName}>
          Continue
        </button>
  
        {isSubmitted && (
          <div className="ranking">
            <h3>Ranking</h3>
            <ol>
              {ranking.map((player, index) => (
                <li key={index}>
                  {player.name}: {player.stars} stars, {player.time} seconds
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    );
  };
  
  export default GameOver;
  