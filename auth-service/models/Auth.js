const mongooses = require('mongoose')
const bycript = require('bcryptjs')
const {ObjectId} = mongooses.Schema

const authSchema = new mongooses.Schema({
  username:{
    type:String,
    required: true
  },
  password:{
    type:String,
    required: true
  },
  passwordDecrypt: {
    type:String,
    required: true
  },
  tokenId:[{
    type:ObjectId,
    ref:'Token'
  }]
})

authSchema.pre('save',async function(next){
  const user = this
  if(user.isModified('password')){
    user.password = await bycript.hash(user.password,8)
  }
})

module.exports = mongooses.model('Auth',authSchema)