var express = require('express');
var router = express.Router();

const User = require('../models/user');
const registerInitialChecks = require('../middlewares/registerInitialChecks');
const register = require('../controllers/register');
const { userAuth, userLogin, serializeUser } = require('../middlewares/auth');

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll(
      {
        attributes: 
        {
          exclude: ['password']
        }
      }
    );
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

router.post('/signup', registerInitialChecks, register);

router.post('/login', async (req, res) => {
  await userLogin(req.body, res);
});

router.get('/logout', (req, res) => {
  console.log(req.session);
  req.session.destroy(function(err) {
    if(err) { 
      console.log(err);
    } else {
        res.status(200).send("You have been successfully logged out");
        console.log(req.session);
    }
  })
});

router.get('/profile', userAuth, async (req, res) => {
  // return res.json(req.session);
  return res.json(serializeUser(req.user));
});

module.exports = router;
