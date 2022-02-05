const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Databse
connectDB();

//Init Middleware
//This allows to access req.body in the routes e.g., users.js
app.use(express.json({ extended: false }));

//Define Routes

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
