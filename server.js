const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// API endpoint
app.get("/api/news", async (req, res) => {
    try {
        const response = await fetch("https://agentx.site/trends.json");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Failed to fetch trends" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});