const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// app.listen(3000);
app.listen(3000, 	
    '192.168.0.105' || '127.0.0.1');