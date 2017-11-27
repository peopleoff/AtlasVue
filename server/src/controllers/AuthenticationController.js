const {users} = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

function jwtSignUser (user){
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {

  async register (req, res) {
      console.log(req.body);
    try {
      const user = await users.create(req.body);
        res.redirect('/');
    } catch (err) {
      res.status(400).send({
        error: err,
        message: 'failed'
      })
    }
  },

  async login (req, res) {
    try {
      const {user_login, user_password} = req.body;

      console.log('User Login '+user_login);
      console.log('User Password '+user_password);

      const loginUser = await users.find({
        where: {
          user_login: user_login
        }
      });
      if (!loginUser){
        return res.status(400).send({
          error: 'login information is incorrect'
        })
      }

      const validPassword = loginUser.comparePassword(user_password);
      if(!validPassword){
        return res.status(403).send({
          error: 'login information is incorrect'
        })
      }

      const userJson = loginUser.toJSON();
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })

    } catch (err) {
      res.status(500).send({
        error: err,
        message: 'failed login'
      })
    }
  },
};