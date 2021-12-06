const ClientService = "Rohim-Service"
const AuthKey = "Microservices-Key"
const api = require('../helpers/api');
const serverApi = api(process.env.AUTH_SERVICE)

const verifyIdentity=(req, res, next)=>{

  const clientService = req.headers["client-service"]
  const authKey = req.headers["auth-key"]

  // check header
  if(clientService === ClientService && authKey === AuthKey){
    next()
  }
  else{
    res.printjson(405, "Authetication identity failed", [])
  }
}

const authentication=async(req, res, next)=>{
  try {
    const token = req.header('Token').replace('Bearer ', '')

    const checkToken = await serverApi.post(process.env.AUTH_SERVICE+'login', {token:token})
    
    if(checkToken.status === 200){
      next()
    }
    else{
      res.printjson(401, "Not authorized to access this resource", [])
    }
    
    // const data = jwt.verify(token, process.env.JWT_KEY)
    // const userid = data._id

    // const auth = await knex('log_trx_auth').where({
    //   user_id: userid,
    //   token : token
    // })

    // const profile = await knex('m_user').where({
    //   id:userid
    // })

    // if(auth.length > 0){
    //   req.user = profile[0]
    //   req.token = token
    //   next()
    // }
    // else{
    //   res.printjson(401, "Not authorized to access this resource", [])
    // }
  } catch (error) {
    console.log('auth error ',error)
    res.printjson(401, "Not authorized to access this resource", [])
  }
}

module.exports = { verifyIdentity, authentication}