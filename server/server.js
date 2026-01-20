const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// These represent real physical assets (like delivery vans or servers)
let assets = [
  { id: 1, name: "Delivery Van #102", status: "Active", priority: "High", progress: 65, lastPing: "2s ago" },
  { id: 2, name: "Main Warehouse Gate", status: "Closed", priority: "Medium", progress: 100, lastPing: "10s ago" },
  { id: 3, name: "Node-JS-Server-01", status: "Active", priority: "High", progress: 90, lastPing: "1s ago" }
];

// SIMULATION: Every 3 seconds, we change the "raw data"
setInterval(() => {
    assets = assets.map(asset => {
        if (asset.progress < 100 && asset.status === "Active") {
            const newProgress = Math.min(100, asset.progress + Math.floor(Math.random() * 5));
            return { ...asset, progress: newProgress, lastPing: "Just now" };
        }
        return asset;
    });
}, 3000);

app.get('/api/projects', (req, res) => res.json(assets));

app.post('/api/projects', (req, res) => {
    const newAsset = { 
        id: Date.now(), 
        name: req.body.name || "New Sensor", 
        status: "Active", 
        priority: "Medium", 
        progress: 0,
        lastPing: "Just now"
    };
    assets.push(newAsset);
    res.status(201).json(newAsset);
});

const PORT = 5001;
app.listen(PORT, () => console.log(`📡 Telemetry Server live on port ${PORT}`));