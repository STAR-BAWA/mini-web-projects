#!/usr/bin/env node

const { dir } = require("console");

let fs = require("fs");
let path = require("path");

let inputArr = process.argv.slice();
console.log(inputArr);
let types = {
    media: ["mp4", "mkv"],
    archives: ["zip", "7z", "rar", "tar", "iso", "xz"],
    documents: ["docx", "doc", "pdf", "xlsx", "xls", "odt", "ods", "odp", "txt"],
    app: ['exe', 'dmg', "pkg", "deb"]
};
//this gives the 3 most crucial things
/*
1) location of node.exe
2) current file location 
3) user arguments

*/

inputArr = process.argv.slice(2);
// console.log(inputArr);
// tree function --> directoryPath
//organize function -->directoryPath
//help function -->directoryPath

let command = inputArr[0];
switch (command) {
    //user arguments are sliced 
    //so that at 0th index we have function
    //1th index contains the path so we pass the path
    case "tree":
        treeFn(inputArr[1]);
        break;
    case "organize":
        Organize(inputArr[1]);
        break;

    case "wcat":
        showfiles(inputArr[1]);
        break;

    case "help":
        help(inputArr[1]);
        break;

    default:
        console.log("Please input right command 🙏");
        break;
}

function showfiles(dirpath){

    
  

}

function treeFn(dirPath) {

    // let destpath;
    if (dirPath == undefined || dirPath==null) {
        console.log(process.cwd());
        treeHelper(process.cwd(),"");
    }
    else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {
            treeHelper(dirPath,"");
        }
        else {
            console.log("Enter correct path");
            return;
        }
    }

}

function treeHelper(dirPath,indent){
    let isFile=fs.lstatSync(dirPath).isFile();
    if(isFile==true){
        let fileName=path.basename(dirPath);
        console.log(indent+"|--"+fileName);
    }
    else{
        let dirName=path.basename(dirPath);
        console.log(indent+"!---"+dirName);
        let children=fs.readdirSync(dirPath);
        for(let i=0;i<children.length;i++){
            let childPath=path.join(dirPath,children[i]);
            treeHelper(childPath,indent+"\t");
        }
    }
}

function Organize(dirPath) {
    //TODO
    // 1) input->directory path given
    // 2)create -> organized_files ->directory
    // 3)identify categories all files present in the input directory
    // 4) cpy files to that organized directory inside any of the folder
    let destpath;
    if (dirPath == undefined) {
        destpath=process.cwd();
        return;
    }
    else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {
            //create directory
            destpath = path.join(dirPath, "MyDirectory_name");
            if (destpath.existsSync == false) {
                fs.mkdirSync(destpath);
            }
            else {
                console.log("File Already exist");
            }
        }
        else {
            console.log("Enter correct path");
            return;
        }
    }
    //!source and destination path will be send
    Organizehelper(dirPath, destpath);

}
function Organizehelper(src, dest) {
    //read the files 
    console.log("Hello world");
    let childNames = fs.readdirSync(src);
    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i]);
        let isfile = fs.lstatSync(childAddress).isFile();
        if (isfile) {
            let category = getCategory(childNames[i]);
            console.log(childNames[i], "belongs to -->", category);
            sendFile(childAddress, dest, category);
        }
    }
}

function getCategory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1);
    for (let type in types) {
        let cTypeArray = types[type];
        for (let i = 0; i < cTypeArray.length; i++) {
            if (ext == cTypeArray[i]) {
                return type;
            }
        }
    }
    return "";

}
function sendFile(srcFile, dest, category) {
    //send the file to destination folder

    let categoryPath=path.join(dest,category);
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }
   let fileName= path.basename(srcFile);
// !!    var path = require('path');
// //Extract the filename, but leave the file extension:
// !!var filename = path.basename('/Users/Refsnes/demo_path.js', '.js');
// !!console.log(filename); demo_path
   let destFilepath=path.join(categoryPath,fileName);
   fs.copyFileSync(srcFile,destFilepath);
   fs.unlinkSync(srcFile);//cut the file from source   
   console.log(fileName,"copied to",category)
}

function help(dirPath) {
    console.log(`
     List of all the commands 
     1)tree 
     2)Organize
     3)help
    `);
    console.log(dirPath);
}