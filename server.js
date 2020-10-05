
const express = require('express');
const mongoose = require('mongoose')



const app = express();

const db = require('./config/keys').mongoURI
mongoose
    .connect(db)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

    
app.get('/', (req, res) => res.send('working'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));