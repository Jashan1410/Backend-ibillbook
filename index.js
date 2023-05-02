const connectToMongo = require('./Database');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
var cors = require('cors')
const app = express()
const port = 5000
const authentication = require('./routes/auth')
const History = require('./routes/History')
const Users = require('./routes/Users')

connectToMongo();

app.use(cors())
app.use(express.json());

app.use('/api/authentication',authentication);
app.use('/api/History',History);
app.use('/api/Users',Users);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening http://localhost:${port}`)
})