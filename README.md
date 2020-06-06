# pinboardToPocket
A Node server that syncs new To Read articles from Pinboard to Pocket. I wrote this software to automatically send my Pinboard To Read articles to Pocket, so that they sync automatically with Kobo Forma, as Kobo supports only Pocket and not Pinboard.

## Instructions
1. run `npm install`
2. Create a file called .env in the project's root directory (i.e., `pinboardToPocket/.env`)
3. Populate the `.env` with the following keys and your values. Pinboard's API key is available on pinboard.in on the Settings page. Pocket's Consumer Key is available once you Create a New App on their developer page. To get the Pocket Access Token, run `node pocketAuth.js`, click through the link in the console, click "Authorize", ignore the google page that pops up, and then copy-paste the token that appears in the console into the `.env`.
```
PINBOARDAPIKEY=
POCKETCONSUMERKEY=
POCKETACCESSTOKEN=
```
4. Run `node index.js`

If your access token changes for some reason (security on Pocket's end?) you may have to rerun pocketAuth.js and input the new Auth Token into the .env.