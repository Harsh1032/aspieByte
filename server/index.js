const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const sqlite3 = require('sqlite3').verbose();
const app = express();

//databse connection
// mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log("database connected"))
// .catch((err) => console.log('database not connected', err))



app.use(express.json());
app.use(cors());

app.use('/', require('./routes/authRoutes'))

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));