const jwt = require('jsonwebtoken')
const Token = require('../models/Token')
const Auth = require('../models/Auth')

const createToken=async(user)=>{

  var now = new Date()
  var expired_at =now.getHours()+24

  const jsonwebtoken = jwt.sign({_id:user._id},process.env.JWT_KEY)

  const token = {
    token : jsonwebtoken,
    expiredAt : expired_at
  }

  const tokenSave = await Token.create(token)

  if(tokenSave){
    const auth = await Auth.findOne({_id:user._id})
    console.log('tokenSave',tokenSave)
    auth.tokenId.push({_id:tokenSave._id})
    auth.save()
  }

  return token

}

module.exports = { createToken }