const jwt = require('jsonwebtoken');
const redis = require('redis');

// setup redis
// (async () => {
//   const redisClient = redis.createClient({
//     url: process.env.REDIS_URI,
//   });

//   redisClient.on("error", console.error);

//   await redisClient.connect();

//   await redisClient.set("key", "value");
//   const value = await redisClient.get("key");

//   console.log(value);
// })();

// const redisClient = redis.createClient({
//   url: process.env.REDIS_URI,
// });

// async function redisConnect () {
//   return await redisClient.connect();
// }

// redisConnect()



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


const handleSignIn = (db, bcrypt) => {
  console.log('handleSignIn')
  const { email, password } = req.body;

  if (!email || !password) {
    return Promise.reject('incorrect form submission');
  }

  return db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      // it should be 'compareSync', not 'compare'
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', req.body.email)
          .then(user => user[0])
          .catch(err => Promise.reject('unable to get user'))
      } else {
        Promise.reject('wrong credentials');
      }
    })
    .catch(err => Promise.reject('wrong credentials'))
}

const getAuthTokenId = () => {
  console.log('auth ok')
}


const signToken = (email) => {
  const jwtPayload = { email };
  return sign(jwtPayload, 'JWT_SECRET', { expiresIn: '2 days' })
}

const setToken = (key, value) => {
  return Promise.resolve(redisClient.set(key, value));
}

const createSessions = async (user) => {
  const { email, id } = user;
  const token = signToken(email);
  try {
    await setToken(token, id);
    return { success: 'true', userId: id, token };
  } catch (message) {
    return console.log(message);
  }
}

const signinAuthentication = (db, bcrypt) => (req, res) => {
  const { authorization } = req.headers;
  return authorization ?
    getAuthTokenId(req, res) :
    handleSignIn(req, res, db, bcrypt)
      .then(data => {
        return data.id && data.email ? createSessions(data) : Promise.reject(data)
      })
      .then(session => res.json(session))
      .catch(err => res.status(400).json(err))
}


module.exports = {
  handleRegister,
  handleSignIn,
  signinAuthentication
}