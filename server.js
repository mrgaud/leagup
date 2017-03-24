const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const userRoutes = require('./routes/userRoutes.js');
console.log();
app.use(cors());
app.use(bodyParser.json())
app.use('/user', userRoutes)


app.listen(3000, ()=>console.log(`listening on port: 3000`))
