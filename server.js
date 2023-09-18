const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const noteRoute = require('./routes/noteRoute');

const PORT = process.env.PORT || 3000;
const app = express();

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
})

app.use(cors());
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());



app.get('/', (req, res) => {
    res.send("Welcome Server Running..!")
})

//router amount
app.use('/api/v1', noteRoute);


// not Found MW
app.use((req, res, next) => {
    res.status(404).json({ message: `Not Found this route: ${req.get('host')}${req.path}` });
})

// Error MW 
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
})