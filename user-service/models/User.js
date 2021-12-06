const mongooses = require('mongoose')

const userSchema = new mongooses.Schema({
  username:{
    type:String,
    required:true
  },
  accountNumber:{
    type:String,
    required:true
  },
  emailAddress:{
    type:String,
    required:true
  },
  identityNumber:{
    type:String,
    required:true
  },
  timestamp:{
    type:Date,
    default:new Date()
  }
})

module.exports = mongooses.model('User',userSchema)