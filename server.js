const http = require("http");
const url = require("url");
const app = require("./app");


app.get("/", (req,res)=>{
    
    res.end("Home Page method: "+ req.url);
});

app.get("/test", (req,res)=>{
    res.end("from test callback");
});

app.get("/test/:id", (req,res)=>{
    res.end("param test callback..."+ JSON.stringify(req.params));
});

app.get("/test/hello/:id", (req,res)=>{
    res.end("param test/hello callback..."+ JSON.stringify(req.params));
});

app.post("/", (req,res)=>{
    res.end("post route"+ req.url);
});

app.get("/*", (req,res)=>{
    res.end("Default route..."+ req.url);
});

// show all routes
app.show();



const server = http.createServer((req,res)=>{
    app.run(req,res);
});



server.listen(3000, ()=>console.log('3000'));


