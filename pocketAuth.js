//run this file with Node once, first, to generate an API key. Save the API key to the .env

require('dotenv').config();
const pinboardKey = process.env.PINBOARDAPIKEY;
const pocketKey = process.env.POCKETCONSUMERKEY;
const pocketToken = process.env.POCKETACCESSTOKEN;
const axios = require('axios').default;
let request_token; // Pocket consumer request token

// POCKET AUTH//
axios.post('https://getpocket.com/v3/oauth/request', {
        consumer_key: pocketKey,
        redirect_uri: "https%3A%2F%2Fgoogle.com"
    })
    .then((response) => {
        console.log("Pocket server response: " + response.status);
        console.log("Pocket response code: " + response.data);
        request_token = response.data.substring(5);
        console.log("Visit this address and confirm Pocket authorization request.");
        console.log("https://getpocket.com/auth/authorize?request_token=" + request_token + "&redirect_uri=https%3A%2F%2Fgoogle.com");
        setTimeout(() => {
            axios.post("https://getpocket.com/v3/oauth/authorize", {
                    consumer_key: pocketKey,
                    code: request_token
                })
                .then((response) => {
                    console.log("Pocket Access Token response:")
                    console.log(response.data)
                })
        }, 20000);
    })
    .catch((error) => {
        console.log(error);
    });