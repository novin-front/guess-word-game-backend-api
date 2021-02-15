const axios = require('axios');
exports.shortLinkGenerator = async (titleLink) => {
    let headers = {
        'X-API-KEY': '9t_aLxLeQxFdx1oit4ZbiVrYRltPjpnW1_M8rl0s'
    }
    let data = {
        target: titleLink,
        description: "",
        expire_in: "30 days",
        password: "",
        customurl: "",
        reuse: false,
        domain: ""
      }
      let url = "https://kutt.it/api/v2/links";
      return axios.post(url,data,{
          headers: headers
        })

}