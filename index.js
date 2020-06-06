require('dotenv').config();
const pinboardKey = process.env.PINBOARDAPIKEY;
const pocketKey = process.env.POCKETCONSUMERKEY;
const pocketToken = process.env.POCKETACCESSTOKEN;
const fs = require('fs');
const axios = require('axios').default;
let request_token; // Pocket consumer request token
let lastUpdate; // last time Pinboard was queried
let now; // current time key-value pair

//Update every 5 minutes
setInterval(update, 30000);

function update() {
    // FETCH LASTUPDATE TIME
    fs.readFile('state.json', (err, data) => {
        if (err) { return console.error(err); }
        data = JSON.parse(data);
        if (data.lastUpdate) {
            lastUpdate = new Date(data.lastUpdate);
            console.log(lastUpdate.toString());
            console.log("^^^^ lastUpdate ^^^^^")
        }
    })
    //PINBOARD//
    // Fetch 20 most recent pins in json format.
    axios.get('https://api.pinboard.in/v1/posts/recent', {
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
                    if (post.toread == "yes") {
                        console.log("this post will be sent to pocket");
                        console.log(post);
                        //send to pocket
                        axios.post('https://getpocket.com/v3/add', {
                                url: post.href,
                                title: post.description,
                                time: Math.floor(new Date(post.time).getTime() / 1000),
                                consumer_key: pocketKey,
                                access_token: pocketToken
                            })
                            .then((response) => {
                                console.log("Pocket Add response:");
                                console.log(response.status);
                            })
                            .catch(function(error) {
                                console.log(error);
                            });
                    }
                }
            })
            // SAVE LASTUPDATE TIME
            now = { lastUpdate: new Date() };
            fs.writeFile('state.json', JSON.stringify(now), (err, data) => {
                if (err) { return console.error(err); }
            });
        })
        .catch(function(error) {
            console.log(error);
        });

}

//POCKET AUTH//
// axios.post('https://getpocket.com/v3/oauth/request', {
//         consumer_key: pocketKey,
//         redirect_uri: "https%3A%2F%2Fgoogle.com"
//     })
//     .then((response) => {
//         console.log("Pocket server response: " + response.status);
//         console.log("Pocket response code: " + response.data);
//         request_token = response.data.substring(5);
//         console.log("Visit this address and confirm Pocket authorization request.");
//         console.log("https://getpocket.com/auth/authorize?request_token=" + request_token + "&redirect_uri=https%3A%2F%2Fgoogle.com");
//         setTimeout(() => {
//             axios.post("https://getpocket.com/v3/oauth/authorize", {
//                     consumer_key: pocketKey,
//                     code: request_token
//                 })
//                 .then((response) => {
//                     console.log("Pocket Access Token response:")
//                     console.log(response.data)
//                 })
//         }, 20000);
//     })
//     .catch((error) => {
//         console.log(error);
//     });