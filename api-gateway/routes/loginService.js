var express = require('express');
const api = require('../helpers/api');
var router = express.Router();

const serverApi = api(process.env.AUTH_SERVICE)

/* GET home page. */
router.post('/login', async function(req, res, next) {
  try { 
    const login = await serverApi.post(process.env.AUTH_SERVICE+'login', req.body)
    res.send(login.data)
  } catch(err){
    console.log(err)
    res.printjson(400,"Terjadi kesalahan data",[])
  }
});

module.exports = router;
