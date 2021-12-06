const User = require('../models/User')
const redis = require('redis')

const client =redis.createClient({
  host:'127.0.0.1',
  port :6379
})

module.exports = {

  user:async(req,res)=>{
    try{
      var response = []
      client.get('user', async(err, results)=>{
        if(results != null){
          const resultJson = JSON.parse(results)
          res.printjson(200, "Successsfully", resultJson)
        }
        else{
          const data = await User.find()
          if(data.length > 0){
            client.setex('user', process.env.EXPIRE_TIME, JSON.stringify(data))
            status_code = 200
            message = "Successfully"
            response = data
          }
          else{
            status_code = 400
            message = 'Failed'
          }
          res.printjson(status_code, message, response)
        }
      })
    } catch(err){
      console.log(err)
      res.printjson(400, "Terjadi kesalahan data",[])
    }
  },

  processUser:async(req, res)=>{
    try{
      var response = []
      const { id, username, accountnumber, email, identitynumber } = req.body

      if(username == '' || accountnumber == '' || email == '' || identitynumber == ''){
        status_code = 400
        if(identitynumber == ''){
          message = 'Identity number cannot be empty'
        }
        if(email == ''){
          message = 'Email address cannot be empty'
        }
        if(accountnumber == ''){
          message = 'Account number cannot be empty'
        }
        if(username == ''){
          message = 'Username cannot be empty'
        }
      }
      else{
        // process update
        if(id != '' && id != undefined){
          const user = await User.findOne({_id:id})
          user.username = username
          user.accountNumber = accountnumber
          user.emailAddress = email
          user.identityNumber = identitynumber
          const update = user.save()
          if(update != null){
            status_code = 200
            message = 'Update is successfully'
            
            client.get('user',async(err, results)=>{
              let data = await JSON.parse(results)
              if(results != null){
                for(var i=0; i < Object.keys(data).length; i++){
                  if(data[i]._id === id){
                    data[i].username = username
                    data[i].accountNumber = accountnumber
                    data[i].emailAddress = email
                    data[i].identityNumber = identitynumber
                  }
                }
              }
              let json2str = JSON.stringify(data)
              client.set('user', json2str, (err, reply)=>{
                if(err){
                  console.log('err ',err)
                }
                else{
                  console.log(reply)
                }
              })
            })

          }
          else{
            status_code = 400
            message = 'Update is failed'
          }
        }
        else{
          // process insert
          var user_data = []
          const user = await User.create({
            username : username,
            accountNumber : accountnumber,
            emailAddress : email,
            identityNumber : identitynumber,
          });
          if(user != null){
            status_code = 200
            message = 'Successfully'
            client.get('user',async(err, results)=>{
              let data = await JSON.parse(results)
              if(results != null){
                user_data = data
              }
              user_data.push(user)
              client.set('user', JSON.stringify(user_data), (err, reply)=>{
                if(err){
                  console.log('err ',err)
                }
                else{
                  console.log(reply)
                }
              })
            })
          }
          else{
            status_code = 400
            message = 'Data failed to save'
          }
        }
      }
      res.printjson(status_code, message, response)
    } catch(err){
      console.log(err)
      res.printjson(400, "Terjadi kesalahan data",[])
    }
  },

  deleteUser:async(req, res)=>{
    try{
      var response = []
      const { id } =req.body
      const user = await User.findOne({_id:id}).deleteOne()
      console.log(user)
      if(user.deletedCount > 0){
        status_code = 200
        message = 'Delete is successfully'
        client.get('user',async(err, results)=>{
          let data = await JSON.parse(results)
          if(results != null){
            for(var i=0; i < Object.keys(data).length; i++){
              if(data[i]._id === id){
                data.splice([i],1)
              }
            }
          }
          let json2str = JSON.stringify(data)
          client.set('user', json2str, (err, reply)=>{
            if(err){
              console.log('err ',err)
            }
            else{
              console.log(reply)
            }
          })
        })
      }
      else{
        status_code = 400
        message = 'Delete is failed'
      }
      res.printjson(status_code, message, response)
    } catch(err){
      console.log(err)
      res.printjson(400, "Terjadi kesalahan data",[])
    }
  },

  userByAccountNumber:async(req, res)=>{
    try{
      var response = []
      const { accountnumber } = req.body
      const data = await User.findOne({accountNumber:accountnumber})
      if(data != null){
        status_code = 200
        message = "Successfully"
        response = data
      }
      else{
        status_code = 400
        message = 'Failed'
      }
      res.printjson(status_code, message, response)
    } catch(err){
      console.log(err)
      res.printjson(400, "Terjadi kesalahan data",[])
    }
  },

  userByIdentityNumber:async(req, res)=>{
    try{
      var response = []
      const { identitynumber } = req.body
      const data = await User.findOne({identityNumber:identitynumber})
      console.log(data)
      if(data != null){
        status_code = 200
        message = "Successfully"
        response = data
      }
      else{
        status_code = 400
        message = 'Failed'
      }
      res.printjson(status_code, message, response)
    } catch(err){
      console.log(err)
      res.printjson(400, "Terjadi kesalahan data",[])
    }
  },

}