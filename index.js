require('dotenv').config();
const pinboardKey = process.env.PINBOARDAPIKEY;
const pocketKey = process.env.POCKETCONSUMERKEY;
const axios = require('axios').default;
let request_token;

axios.get('https://api.pinboard.in/v1/method?auth_token=' + pinboardKey)
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log(error);
    })
    .finally(function() {
    });

// axios.post('https://getpocket.com/v3/oauth/request', {
// 	consumer_key:pocketKey,
// 	// redirect_uri: /// TKTKTK 
//   })
//   .then(function (response) {

//   	console.log("response code is");
//   	console.log(response.code);
//     request_token = response.code;
//   })
//   .catch(function (error) {
//     console.log(error);
//   });