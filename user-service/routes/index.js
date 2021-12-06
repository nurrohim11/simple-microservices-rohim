var express = require('express');
const UserController = require('../controllers/UserController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user', UserController.user)
router.post('/process_user', UserController.processUser)
router.post('/delete_user', UserController.deleteUser)
router.post('/user_by_identity_number', UserController.userByIdentityNumber)
router.post('/user_by_account_number', UserController.userByAccountNumber)

module.exports = router;
