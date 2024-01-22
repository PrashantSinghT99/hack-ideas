import axios from 'axios'
const apiHelper = async(method, url, body, header) => {
  let config = {
    method: method,
    url,
    headers: header
      ? header
      : {
          "Content-Type": "application/json",
        },
    data: body?body:"",
  };
console.log(config);
  return axios(config)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export default apiHelper;