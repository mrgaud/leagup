const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const app = express()
const userRoutes = require('./routes/userRoutes.js');
const mainRoutes = require('./routes/mainRoutes.js');
const teamRoutes = require('./routes/teamRoutes.js');

app.use(cors());
app.use(bodyParser.json())
app.use(session({
    secret:'keyboard cat'
}))

app.use(passport.initialize());
app.use(passport.session())
app.use(express.static('./public'))

app.use('/user', userRoutes);
app.use('/team', teamRoutes)
app.use('/', mainRoutes);



app.listen(3000, ()=>console.log(`listening on port: 3000`))
