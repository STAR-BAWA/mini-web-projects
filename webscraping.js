console.log("")
const cheerio = require('cheerio');
const request = require('request');
request('https://www.worldometers.info/coronavirus', cb);

function cb(error, response, html) {
    if (error) {
        console.log("error", error);
    } else {
        handlehtml(html)
        //print the html for the google homepage
    }

} 

function handlehtml(html) {
    let selTool = cheerio.load(html);

    let contentArr = selTool("#maincounter-wrap span");
    for (let i = 0; i < contentArr.length; i++) {
        let data=selTool(contentArr[i]).text();
        console.log(data);
    }
}


console.log("after")

