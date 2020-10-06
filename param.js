

let path = "/test/hello/world/long";

let pathArr = path.split("/");
pathArr.shift();
console.log(pathArr);

let paths = [];
getAllPaths(pathArr);
console.log(paths);
function getAllPaths(path)
{

    paths.push(path.join("/"));
    path.pop();
    if(path.length>0)
     getAllPaths(path);
    else return true;

}