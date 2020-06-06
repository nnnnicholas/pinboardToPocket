require('dotenv').config();
const pinboardKey = process.env.PINBOARDAPIKEY;
const pocketKey = process.env.POCKETCONSUMERKEY;
const fs = require('fs');
const axios = require('axios').default;
let request_token; // for Pocket
let lastUpdate; // last time Pinboard was queried
let now; // current time key-value pair

setInterval (update, 300000);

function update() {
    // FETCH LASTUPDATE TIME
    fs.readFile('state.json', (err, data) => {
        if (err) { return console.error(err); }
        if (data.lastUpdate) {
            lastUpdate = data.lastUpdate;
            console.log("lastUpdate read from file: " + data.lastUpdate);
        }
    })
    //PINBOARD//
    // Fetch 20 most recent pins in json format.
    axios.defaults.baseURL = 'https://api.pinboard.in/v1';
    axios.get('/posts/recent', {
            params: {
                auth_token: pinboardKey,
                count: 20,
                format: 'json'
            }
        })
        .then(function(response) {
            console.log(response.data);
        })
        .catch(function(error) {
            console.log(error);
        })
        .finally(function() {});
    // Filter which posts are new since lastUpdate

    // Send new bookmarks marked ToRead to Pocket.
    
    //SAVE LASTUPDATE TIME
    now = {lastUpdate:new Date()};
    fs.writeFile('state.json', now, (err, data)=>{
    	if(err) {return console.error(err);}
    })
}




//POCKET//

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