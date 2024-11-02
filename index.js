const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB)
  .then(() => {
    console.log('Connected to DB');
  })
  .catch(err => {
    console.log(err);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Connected")
  })

const search=require('./search')
app.use('/', search)  

app.listen(5000, () => {
    console.log("Server running on port 5000")
})  
