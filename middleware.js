

let route = {};
let functions = [];


function next(){
    let nextRun = functions[0];
    functions.shift();
    nextRun();
}

function initMiddleware(arg){
    let arr = [...arg]
    arr.shift();
    functions = [...arr];
}


function test(path)
{
    initMiddleware(arguments);
    next();
}


test("/path", foo, bar, bla, function(){

    console.log("final callback !!!");   

});



function foo(){
    console.log("foo");
    next();
}
function bar(){
    console.log("bar");
    next();
}
function bla(){
    console.log("bla");
    next();
}