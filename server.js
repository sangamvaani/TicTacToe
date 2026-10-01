const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Static files (JS, CSS, HTML container) serve karne ke liye
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Tic Tac Toe Server running at http://localhost:${PORT}`);
});