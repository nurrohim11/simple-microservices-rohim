const mongooses = require('mongoose')

const tokenSchema = new mongooses.Schema({
  token:{
    type:String,
    required: true
  },
  expiredAt:{
    type:Date,
    required:true
  },
  timestamp:{
    type:Date,
    default:new Date()
  }
})

module.exports = mongooses.model('Token',tokenSchema)