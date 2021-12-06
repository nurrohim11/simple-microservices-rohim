const bycript = require('bcryptjs')
const { createToken } = require('../helpers/Token')
const Auth = require('../models/Auth')

module.exports = {

  login:async(req, res) =>{
    try{
      let response = []

      const { username, password } = req.body

      if(username == '' || password == ''){
        status_code = 400
        if(password == ''){
          message = 'Password cannot be empty'
        }
        if(username == ''){
          message = 'Username cannot be empty'
        }
      }
      else{
        const user = await Auth.findOne({username:username})
        if(user != null){
          console.log(user)
          const isPasswordMatch = await bycript.compare(password, user.password);

          if(isPasswordMatch){
            let tokek = await createToken(user)
            response = {
              _id: user._id,
              username: user.username,
              token: tokek.token
            }
            status_code =200
            message = "Login succesfully"
          }
          else{
            status_code =400
            message= 'Password is not same'
          }
        }
        else{
          status_code = 400
          message = 'Username is not found'
        }
      }
      res.printjson(status_code, message, response)
    } catch(err){
      console.log(`console log ${err}`)
      res.printjson(400, "Terjadi kesalahan data", [])
    }
  },

  checkToken:async(req, res)=>{
    try {
      let response = []
      const { token } = req.body
      const data = jwt.verify(token, process.env.JWT_KEY)
      const userid = data._id

      const user = await Auth.findOne({_id: userid})
        
      // let obj = user.tokenId.find(o => o.token === token)
      
      if(user != null){
        status_code = 200
        message= 'Successfully'
      }
      else{
        status_code = 400
        message = 'Token is not found'
      }
      res.printjson(status_code, message, response)
    } catch(err){
      console.log(`console log ${err}`)
      res.printjson(400, "Terjadi kesalahan data", [])
    }
  }

}