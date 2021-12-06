var express = require('express');
const AuthController = require('../controllers/AuthController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', AuthController.login);

router.post('/check_token', AuthController.checkToken)

module.exports = router;
