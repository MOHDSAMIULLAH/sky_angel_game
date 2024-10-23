# Sky Angel

Sky Angel is a browser-based game developed using HTML, CSS, JavaScript, and React.js. The goal of the game is to fly an aircraft, avoid birds, and collect parachutes for fuel and stars for points. The game operates on a 1024x768 resolution and runs on most common web browsers. The objective is to survive as long as possible while managing fuel and collecting stars.

## Features

- *Aircraft Control:* Use arrow keys to move the aircraft up, down, left, and right.
- *Avoid Obstacles:* Dodge birds that appear in random positions and fly across the screen.
- *Collect Items:* Parachutes restore fuel, and stars increase your score.
- *Game Timer:* The game keeps track of how long the aircraft stays in the air.
- *Fuel Management:* The aircraft starts with 10 fuel points (10 seconds). Collect parachutes to gain extra fuel.
- *Pause/Resume:* Pause or resume the game by pressing the space bar or clicking the pause button.
- *Game Over:* The game ends when the aircraft runs out of fuel or collides with a bird.
- *Submit Score:* After the game is over, players can submit their name, time, and stars collected to a ranking system.

## Technologies Used

- *HTML/CSS* for the game's layout and styling.
- *React.js* for client-side functionality and game logic.
- *JavaScript* for handling game mechanics and interactions.
- *Express.js* for the backend to handle score submission and ranking.
- *MongoDB* with Mongoose for storing player data (name, time, and stars).

## How to Play

1. Open the game in a web browser.
2. Click the "Start Game" button to begin.
3. Use the arrow keys to move the aircraft:
   - Left Arrow: Move left
   - Right Arrow: Move right
   - Up Arrow: Move up
   - Down Arrow: Move down
4. Collect parachutes to increase fuel by 10 points.
5. Collect stars to increase your score.
6. Avoid birds flying across the screen.
7. Press the space bar or click the "Pause" button to pause or resume the game.
8. If fuel reaches zero or you collide with a bird, the game is over.
9. Enter your name to submit your score to the leaderboard.

## Game Controls

- *Arrow Keys:* Move the aircraft.
- *Space Bar:* Pause/Resume the game.
- *Start Game Button:* Start a new game.
- *Pause Button:* Pause or resume the game.

## Installation

### Prerequisites
- Node.js
- MongoDB

### Setup Instructions

1. Clone the repository:
   bash
   git clone [https://github.com/yourusername/sky-angel.git](https://github.com/MOHDSAMIULLAH/sky_angel_game.git)
   cd sky-angel
   

2. Install dependencies:
   bash
   npm install
   

3. Start the development server:
   bash
   npm start
   

4. Open your browser and navigate to:
   
   http://localhost:3000
   

### Backend Server

1. To run the backend server (Express.js):
   bash
   cd server
   npm install
   npm start
   

2. Ensure MongoDB is running locally or configure the MongoDB connection string in your .env file:
   bash
   MONGO_URI=mongodb://localhost:27017/skyangel
   

3. The backend handles player score submission and returns the leaderboard in JSON format.
