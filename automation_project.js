const puppeteer = require('puppeteer');

const loginLink = 'https://www.hackerrank.com/auth/login/google';
const email = 'saistarbawa@gmail.com';
const password = 'c4c8#123';
const codes_sol=require('./codes');
const { del } = require('request');

const browserOpenPromise = puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
    defaultViewport: null,
    
});

console.log("Start");
let page;

browserOpenPromise
    .then(function(browser) {
        const pagesArrPromise = browser.pages();
        return pagesArrPromise;
    })
    .then(function(browserPages) {
        page = browserPages[0];
        let gotoPromise = page.goto(loginLink);
        return gotoPromise;
    })
    .then(function() {
        const emailInputPromise = page.waitForSelector("input[type='text' i] ", { visible: true });
        return emailInputPromise;
    })
    .then(function() {
        let emailIsEntered = page.type("input[type='text' i]", email, { delay: 40 });
        return emailIsEntered;
    })
    .then(function() {
        let nextButtonPromise = page.waitForSelector("input[type='password' i]", { visible: true });
        return nextButtonPromise;
    })
    .then(function() {
        let nextButtonClickPromise = page.click("input[type='password' i]", { delay: 50 });
        return nextButtonClickPromise;
    })
    .then(function() {
        const passwordInputPromise = page.waitForSelector("input[type='password']", { visible: true });
        return passwordInputPromise;
    })
    .then(function() {
        let pwdIsEntered = page.type("input[type='password']", password, { delay: 50 });
        return pwdIsEntered;
    })
    .then(function() {
        let loginButtonPromise = page.waitForSelector("button[type='button']", { visible: true });
        return loginButtonPromise;
    })
    .then(function() {
        let loginButtonClickPromise = page.click("button[type='button']", { delay: 50 });
        return loginButtonClickPromise;
    }).then(function (){
        let preparePromise=page.waitForSelector("a[href='/dashboard']",{visible:true});
        return preparePromise;
    }).then(function (){
        let prepareClickPromise=page.click("a[href='/dashboard']",{delay:50});
        return prepareClickPromise;
    }).then(function (){
        let algoLocationPromise=page.waitForSelector('.topic-item');
        return algoLocationPromise;
    }).then(function(){
        let algoClickPromise=page.click(".topic-item");
        return algoClickPromise;
    }).then(function(){
        let warmupLocationPromise=page.waitForSelector("input[value='warmup']");
        return warmupLocationPromise;
    }).then(function(){
        let warmupcheckPromise=page.click("input[value='warmup']");
        return warmupcheckPromise;
    }).then(function(){
        let buttonLocationPromise=page.waitForSelector('.theme-m .ui-btn-styled ');
        return buttonLocationPromise;
    }).then(function(){
        let allchallengesPromise=page.$$('.theme-m .ui-btn-styled ');
        //double dollar means that it is equivalent to document.querySelectorForAll('_id');
        return allchallengesPromise;
    }
    ).then(function(questionsArr){
        console.log("number of questions",questionsArr.length);
        let questionWillbeSolved=questionSolver(page,questionsArr[0],codes_sol.answers[0]);
        return questionWillbeSolved;
    }).catch(function(error) {
        console.log(error);
    });

function questionSolver(page,question,answer){
    return new Promise(function(resolve,reject){
        let questionWillBeClicked=question.click(question[0]);
        questionWillBeClicked.then(function(){
            console.log("Question clicked");
            let EditorFocusPromise=page.waitForSelector('.monaco-editor.no-user-select.vs',{delay:10});
            return EditorFocusPromise;
        }).then(function(){
            let checkboxPromise=page.waitForSelector("input[type='checkbox' i]");
            return checkboxPromise;
        }).then(function(){
            let checkboxClickPromise=page.click("input[type='checkbox' i]");
            return checkboxClickPromise; 
        }).then(function(){
            let TestPortionLocPromise=page.waitForSelector('textarea.custominput',page);
            return TestPortionLocPromise;
        }).then(function(){
            return page.type('textarea.custominput',answer,{delay:10});
        }).then(function(){
            let ctrlisPressedPromise=page.keyboard.down('Control');
            //down for hold
            return ctrlisPressedPromise;
        }).then(function(){
            let AisPressedPromise=page.keyboard.press('A',{delay:100});
            return AisPressedPromise;
        }).then(function(){
            let CutTextPromise=page.keyboard.press('X',{delay:100})
        })
        .then(function(){
                let transfercursorToCode = page.click('.monaco-editor.no-user-select.vs');
                return transfercursorToCode;
        }).then(function(){
            let ctrlisPressedPromise=page.keyboard.down('Control');
            //down for hold
            return ctrlisPressedPromise;
        }).then(function(){
            let AisPressedPromise1=page.keyboard.press('A',{delay:100});
            return AisPressedPromise1;
        })
        .then(function(){
            let VisPressed=page.keyboard.press('V',{delay:100})
            return VisPressed;
        }).then(function(){
            let ctrlisUnPressedPromise=page.keyboard.up('Control');
            //up for release
            return ctrlisUnPressedPromise;
        }).then(function(){
            return page.click('.ui-btn-primary',{delay:50})
        }).then(function(){
            resolve();
        })
        .catch(function(error){
            reject();
            console.log(error);
        })        
    });
}


function waitAndClick(selector,cPage){
    return new Promise(function(resolve,reject){
        let waitForModelPromise=cPage.waitForSelector(selector);
        waitForModelPromise.then(function(){
            let clickModal=cPage.click(selector);
            return clickModal;
        }).then(function(){
            resolve();
        }).catch(function(error){
            reject();
        })
    })
}