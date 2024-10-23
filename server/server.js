const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/skyangel');

// Create a Mongoose schema and model for the game data
const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    time: { type: Number, required: true },  // Time in seconds
    stars: { type: Number, required: true }, // Number of stars collected
});

const Player = mongoose.model('Player', playerSchema);

// API route to register game data
app.post('/register', async (req, res) => {
    try {
        const { name, time, stars } = req.body;

        // Create a new player entry
        const newPlayer = new Player({ name, time, stars });
        await newPlayer.save();

        // Fetch all player data and sort it by stars and time (both in descending order)
        const players = await Player.find().sort({ stars: -1, time: -1 });

        res.status(200).json(players); // Return the sorted player data as JSON
    } catch (error) {
        res.status(500).json({ error: 'Failed to register data' });
    }
});

// API route to get the ranking data
app.get('/ranking', async (req, res) => {
    try {
        // Fetch all players and sort by stars first, then time (both descending)
        const players = await Player.find().sort({ stars: -1, time: -1 });
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch ranking' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
