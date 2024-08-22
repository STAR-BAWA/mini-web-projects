let fs=require('fs');
//This is parallel execution
fs.readFile("file1.txt",cb1);
// fs.readFile("file2.txt",cb2);
// fs.readFile("file3.txt",cb3);

console.log("Before");
// function cb1(error,data){
//     if(error){
//         console.log(error)
//     }else{
//         console.log("content"+data.toString());
//     }
// }

// function cb2(error,data){
//     if(error){
//         console.log(error);
//     }
//     else{
//         console.log(data.toString());
//     }
// }

// function cb3(error,data){
//     if(error){
//         console.log(error);
//     }
//     else{
//         console.log(data.toString());
//     }
// }


//this is serial Execution in js 
function cb1(error,data){
   console.log("content"+data);
   fs.readFile("file2.txt",cb2);
    
   function cb2(error,content){
    console.log("content"+content);
        fs.readFile("file3.txt",cb3);
        function cb3(){
            console.log("content"+content)
        }
   }
}


console.log("After");

 