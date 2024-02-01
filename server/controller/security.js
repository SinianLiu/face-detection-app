const jwt = require('jsonwebtoken');
const redis = require('redis');


const redisClient = redis.createClient({
  url: process.env.REDIS_URI
});

async function redisConnect () {
  return await redisClient.connect();
}

redisConnect()

// to check the connection status

// redisClient.on('ready', () => {
//   console.log('Redis client connected');
// });

// redisClient.on('error', (err) => {
//   console.log('Error connecting to Redis:', err);
// });


const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json('please fill in all fields');
  }
  const hash = bcrypt.hashSync(password);

  // use transaction to make sure that both tables are updated simultaneously
  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    }).into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            name: name,
            email: loginEmail[0].email,
            joined: new Date(),
          })
          .then(user => { res.json(user[0]) })
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
    .catch(err => res.status(400).json('unable to register'))
}


const handleSignIn = (db, bcrypt, req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return Promise.reject('incorrect form submission');
  }

  return db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      // it should be 'compareSync', not 'compare'
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => {
            return user[0]
          })
          .catch(err => Promise.reject('unable to get user' + err + '1'))
      } else {
        // 要加return
        return Promise.reject('wrong credentials');
      }
    })
    .catch(err => Promise.reject('wrong credentials' + err + '2'))
}


// my way to get the token
const getAuthTokenId = async (req, res) => {
  const { authorization } = req.headers;

  try {
    const value = await redisClient.get(authorization);
    res.json({ id: value });
  } catch (err) {
    res.status(401).send('Unauthorized');
  }
}


const signToken = (email) => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, 'JWT_SECRET', { expiresIn: '2 days' })
}


const setToken = (key, value) => {
  return Promise.resolve(redisClient.set(key, value));
}


const createSessions = (user) => {
  const { email, id } = user;

  const token = signToken(email);
  return setToken(token, id)
    .then(() => {
      return { success: 'true', userId: id, token, user };
    })
    .catch(console.log)
}


const signinAuthentication = (db, bcrypt) => (req, res) => {

  const { authorization } = req.headers;

  return authorization ?
    getAuthTokenId(req, res) :
    handleSignIn(db, bcrypt, req, res)
      .then(data => {
        return data.id && data.email ? createSessions(data) : Promise.reject(data)
      })
      .then(session => {
        res.json(session)
      })
      .catch(err => res.status(400).json(err))
}


module.exports = {
  handleRegister,
  handleSignIn,
  signinAuthentication,
  redisClient
}