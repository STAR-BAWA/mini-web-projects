const puppeteer = require("puppeteer");
let page;

console.log("before");
const browserOpenPromise = puppeteer.launch({
    headless: false,
    slowMo: true,
    defaultViewport: null,
    args: ["--start-maximized"]
});

browserOpenPromise.then(function (browser) {
    const pagesArrPromise = browser.pages();
    return pagesArrPromise;
}).then(function (browserPages) {
    page = browserPages[0];
    let gotoPromise = page.goto("https://www.google.com");
    return gotoPromise;
}).then(function () {
    let elementWaitPromise = page.waitForSelector("textarea.gLFyf", { visible: true });
    return elementWaitPromise;
}).then(function () {
    console.log("Reached Google page");
    let keyWillBeSendPromise = page.keyboard.type("Scaler");
    return keyWillBeSendPromise;
}).then(function () {
    let enterWillbePressed = page.keyboard.press("Enter");
    return enterWillbePressed;
}).then(function () {
    let elementWaitPromise = page.waitForSelector('.CCgQ5.vCa9Yd.QfkTvb', { visible: true })
    return elementWaitPromise;
}).then(function () {
    let keyWillBeSendPromise = page.click('.CCgQ5.vCa9Yd.QfkTvb');
    return keyWillBeSendPromise;
}).catch(function (error) {
    console.log(error);
});
console.log("After");
