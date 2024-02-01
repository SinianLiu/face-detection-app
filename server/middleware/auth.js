// at the end, you should add .redisClient
const redisClient = require('../controller/security').redisClient

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).send('Unauthorized');

  try {
    const value = await redisClient.get(authorization);

    if (!value) {
      return res.status(401).send('Unauthorized');
    }

    return next();

  } catch (err) {
    res.status(401).send('Unauthorized');
  }

}


module.exports = {
  requireAuth
}