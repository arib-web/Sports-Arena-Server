const express = require('express');
const cors = require('cors');
const app = express();

// require('dotenv').config()
const port = process.env.PORT || 5000;

// middlewware 
app.use(express.json())
app.use(cors())






app.get('/', (req, res) => {
    res.send('Sports Arena is running')
})
app.listen(port, () => {
    console.log(`Sports Arena is  running on port ${port}`);
})
