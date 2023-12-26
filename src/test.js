//import axios from "axios";
const axios = require('axios');


axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; //'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
//axios
//    .get("https://jsonplaceholder.typicode.com/users/1")
//    .then((response) => {
//	console.log(response);
//    })
axios
//    .get("https://jsonplaceholder.typicode.com/users/1")
    .get("https://301bccgsd2.execute-api.ap-northeast-1.amazonaws.com/location_point_stage/location_point")
    .then((response) => {
	console.log(response);
    })
    .catch((err) => console.log(err));

