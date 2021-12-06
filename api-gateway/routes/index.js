var express = require('express');
const { verifyIdentity, authentication } = require('../middlewares/authentication');
var router = express.Router();
var loginService = require('./loginService')
var userService = require('./userService')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use(verifyIdentity)

router.use(loginService)
router.use(authentication)
router.use(userService)

module.exports = router;
