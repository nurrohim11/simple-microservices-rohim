var express = require('express');
const api = require('../helpers/api');
var router = express.Router();

const serverApi = api()

/* GET home page. */
router.get('/user', async function(req, res, next) {
  try { 
    const user = await serverApi.get(process.env.USER_SERVICE+'user')
    res.send(user.data)
  } catch(err){
    console.log(err)
    res.printjson(400,"Terjadi kesalahan data",[])
  }
});

router.post('/process_user', async(req, res)=>{
  try { 
    const user = await serverApi.post(process.env.USER_SERVICE+'process_user', req.body)
    res.send(user.data)
  } catch(err){
    console.log(err)
    res.printjson(400,"Terjadi kesalahan data",[])
  }
})

router.post('/delete_user', async(req, res)=>{
  try { 
    const user = await serverApi.post(process.env.USER_SERVICE+'delete_user', req.body)
    res.send(user.data)
  } catch(err){
    console.log(err)
    res.printjson(400,"Terjadi kesalahan data",[])
  }
})

router.post('/user_by_identity_number', async(req, res)=>{
  try { 
    const user = await serverApi.post(process.env.USER_SERVICE+'user_by_identity_number', req.body)
    res.send(user.data)
  } catch(err){
    console.log(err)
    res.printjson(400,"Terjadi kesalahan data",[])
  }
})

router.post('/user_by_account_number', async(req, res)=>{
  try { 
    const user = await serverApi.post(process.env.USER_SERVICE+'user_by_account_number', req.body)
    res.send(user.data)
  } catch(err){
    console.log(err)
    res.printjson(400,"Terjadi kesalahan data",[])
  }
})

module.exports = router;
