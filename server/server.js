const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');

const security = require('./controller/security');
const profile = require('./controller/profile');
const image = require('./controller/image');
const auth = require('./middleware/auth');


const db = knex({
  client: 'pg',
  // connection to docker container
  connection: process.env.POSTGRES_URI

  // local connection
  // connection: {
  //   host: process.env.POSTGRES_HOST, 
  //   user: process.env.POSTGRES_USERS,
  //   password: process.env.POSTGRES_PASSWORD, 
  //   database: process.env.POSTGRES_DB
  // }
});


const app = express();

app.use(bodyParser.json());
app.use(cors());
// logger
app.use(morgan('combined'));



app.get('/', (req, res) => { res.send("It's working!"); });
app.post('/signin', security.signinAuthentication(db, bcrypt));
// app.post('/signin', (req, res) => { security.handleSignIn(req, res, db, bcrypt) });
app.post('/register', (req, res) => { security.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileGet(req, res, db) });
app.post('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileUpdate(req, res, db) });
app.put('/image', auth.requireAuth, (req, res) => { image.handleImage(req, res, db) });

const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
}


module.exports = app;