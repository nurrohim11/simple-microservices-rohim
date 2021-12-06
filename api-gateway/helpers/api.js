const axios = require('axios')

module.exports = (baseUrl) => {
  return axios.create({
    baseUrl:baseUrl,
    timeout:3000
  })
}