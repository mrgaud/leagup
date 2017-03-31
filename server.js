const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const keys = require('./keys');

const app = express()
const userRoutes = require('./routes/userRoutes.js');
const mainRoutes = require('./routes/mainRoutes.js');
const teamRoutes = require('./routes/teamRoutes.js');

const aws = require('./s3.js')

app.use(cors());
app.use(bodyParser.json())
app.use(session({
    secret:keys.sessionSecret
}))

app.use(passport.initialize());
app.use(passport.session())
app.use(express.static('./public'))

app.use('/user', userRoutes);
app.use('/team', teamRoutes)
app.use('/', mainRoutes);

app.get('/s3_signed_url', aws.getSignedUrl)



app.listen(3000, ()=>console.log(`listening on port: 3000`))
