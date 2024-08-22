const { DEFAULT_VIEWPORT } = require('puppeteer');
const puppeteer = require('puppeteer');

let link = 'https://www.youtube.com/playlist?list=PLW-S5oymMexXTgRyT3BWVt_y608nt85Uj';
let ctabs;

(async function () {
    try {
        let browserOpen = puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ['--start-maximized--']
        })
        let browserInstance = await browserOpen;
        let alltabs = await browserInstance.pages();
        ctabs = alltabs[0];
        await ctabs.goto(link);
        //await waits for a  promise 
        //async returns a promise 
        await ctabs.waitForSelector('yt-formatted-string#text.style-scope.yt-dynamic-sizing-formatted-string');
        let name = await ctabs.evaluate((select) => {
            return document.querySelector(select).innerText;
          }, 'yt-formatted-string#text.style-scope.yt-dynamic-sizing-formatted-string'); // Corrected selector without spaces

          
        let allData=await ctabs.evaluate(getData,'.yt-content-metadata-view-model-wiz__metadata-row');
        console.log(name,allData.noofVideos,allData.noofViews);
    }
    catch (error) {
            console.log(error);
        }
    }) ()

function getData(selector){
    let alleElems=document.querySelector(selector);
    let noofVideos=alleElems[0].innerText;
    let noofViews=alleElems[2].innerText;

    return {
        noofVideos,
        noofViews
    }
}
