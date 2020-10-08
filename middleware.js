

let route = {};
let functions = [];


function next(){
    let nextRun = functions[0];
    functions.shift();
    nextRun(next);
}

function initMiddleware(arg){
    let arr = [...arg]
    arr.shift();
    functions = [...arr];
    next();
}


function test()
{
    initMiddleware(arguments);
  
}


test("/path", foo, bar, bla, function(){

    console.log("final callback !!!");   

});



function foo(n){
    console.log("foo");
    n();
}
function bar(n){
    console.log("bar");
    n();
}
function bla(n){
    console.log("bla");
    n();
}