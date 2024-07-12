// console.log("line number 1",varname);

// var varname=10;

// console.log("line Number 3",varname);

// function fn(){
//     console.log("line number 8",varname);
//     var varname=20;
//     function b(){
//         console.log("line Number 8",varname);
//     }
//     b();
//     console.log(varname);
// }
// fn();

// var varname=20;

// function fn(){
//     var varname=30;
//     console.log("the value is "+varname);
//     function gn(){
//         console.log("The gn value is ",varname);
//     }
//     gn();
// }
// fn();

console.log("line number 1",varname);


function b(){
    console.log("line number 5",varname);
}
console.log("line Number 7",varname);
function fn(){
    console.log("Line number 9",varname);
    var varname=20;

    //from fn
    console.log("nigga");
    b();
    console.log("line number 13",varname);
}
var varname=10;
fn();