const fs = require("fs");


console.log("Before");

fs.readFile("file1.txt",callback);
function callback(err,data){
    if(err)
        console.log("Error is ",err);
    else 
     console.log("data is ",data+"");
}

console.log("after");
console.log("mean while");