require('dotenv').config();
const pinboardKey = process.env.PINBOARDAPIKEY;
const pocketKey = process.env.POCKETCONSUMERKEY;
const fs = require('fs');
const axios = require('axios').default;
let request_token; // for Pocket
let lastUpdate; // last time Pinboard was queried
let now; // current time key-value pair

//Update every 5 minutes
// setInterval(update, 300000);

update();

function update() {
    // FETCH LASTUPDATE TIME
    fs.readFile('state.json', (err, data) => {
        if (err) { return console.error(err); }
        data = JSON.parse(data);
        if (data.lastUpdate) {
            lastUpdate = new Date(data.lastUpdate);
            console.log(lastUpdate);
            console.log("^^^^ lastUpdate ^^^^^")
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
            // Filter which posts are new since lastUpdate
            response.data.posts.forEach(post => {
                console.log(new Date(post.time).toString());
                // If the post has been added since last update
                if (new Date(post.time) > lastUpdate) {
                    // And is marked To Read
                    // if (post.toread === true) {
                        console.log("this post will be sent to pocket");
                        console.log(post);
                        //send to pocket
                    // }
                }
            })
        })
        .catch(function(error) {
            console.log(error);
        });

    //SAVE LASTUPDATE TIME
    // now = { lastUpdate: new Date() };
    // fs.writeFile('state.json', JSON.stringify(now), (err, data) => {
    //     if (err) { return console.error(err); }
    // })
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