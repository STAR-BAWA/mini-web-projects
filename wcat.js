let fs = require("fs");
//input
let inputArr = process.argv.slice(2);

console.log(inputArr);

//show processs
let optionArr = [];
let fileArr = [];



let content = "";
for (let i = 0; i < inputArr.length; i++) {
    let fchar = inputArr[i].charAt(0);
    if (fchar == '-') {
        optionArr.push(inputArr[i]);
    }
    else {
        fileArr.push(inputArr[i]);
    }
}

//read the file

for (let i = 0; i < fileArr.length; i++) {
    let buffercontent = fs.readFileSync(fileArr[i]);
    content += buffercontent + "\n";
}

console.log(content);

//-s 
let contentArr = content.split("\r\n");
console.log(contentArr);


let isSPresent = optionArr.includes("-s");
let temparr = [];
if (isSPresent) {

    for (let i = 0; i < contentArr.length; i++) {

        if (contentArr[i] == "" && contentArr[i - 1] == "") {
            contentArr[i] = null;
        }
        else if (contentArr[i] == "" && contentArr[i - 1] == null) {
            contentArr[i] = null;
        }
    }
    for (let i = 0; i < contentArr.length; i++) {
        if (contentArr[i] != null) {
            temparr.push(contentArr[i]);
        }
    }
    contentArr = temparr;
}
console.log("------------------------------");
console.log(contentArr.join("\n"));

//edge case
let isbothPresent = optionArr.includes("-b") && optionArr.includes("-n");
if (isbothPresent == true) {
    console.log("enter 1");
    return;
}
//-n 
let NisPresent = optionArr.includes("-n");
if (NisPresent == true) {
    for (let i = 0; i < contentArr.length; i++) {
        contentArr[i] = `${i + 1} ${contentArr[i]}`;
    }
}

console.log(contentArr.join("\n"));

//-b

let isBPresent = optionArr.includes("-b");
let counter = 1;
if (isBPresent == true) {
    for (let i = 0; i < contentArr.length; i++) {
        if (contentArr[i] != "") {
            contentArr[i] = `${counter} ${contentArr[i]}`;
            counter++;
        }
    }
}
console.log(contentArr.join("\n"));