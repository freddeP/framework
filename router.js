// fil för att simulera routes och http-requests version 2.

const app ={

     routes: [],

     get: (path, ...args)=>{

        let obj = {};
        obj.path = path;
        obj.method = "get";
        obj.functions = args;
        app.routes.push(obj);
        
    },
    post: (path, ...args)=>{

        let obj = {};
        obj.path = path;
        obj.method = "post";
        obj.functions = args;
        app.routes.push(obj);
        
    },
    run: (method,url)=>{
        let result = app.routes.find(route => route.path === url && route.method === method);
        console.log("result: ", result);
    },
    show: ()=> console.log(app.routes)

}

app.get("/", mw1,mw2,mw3,mw4, (req,res)=> console.log("final callback") );
app.get("/data", mw1,mw2,mw3,mw4, (req,res)=> console.log("final callback... data") );
app.get("/data/cars", mw1,mw2,mw3,mw4, (req,res)=> console.log("final callback ...data/cars") );
app.get("/data/computers", mw1,mw2,mw3,mw4, (req,res)=> console.log("final callback ...data/computers") );
app.get("/data/phones", mw1,mw2,mw3,mw4, (req,res)=> console.log("final callback ...data/phones") );
app.get("/data/:id", mw1,mw2,mw3,mw4, (req,res)=> console.log("final callback ... data + parms") );
app.get("/data/clients", mw1,mw2,mw3,mw4, (req,res)=> console.log("final callback ...data/clients") );
app.get("/data/clients/:id", mw1,mw2,mw3,mw4, (req,res)=> console.log("final callback ...data/cliens + params") );
app.get("/:search", mw1,mw2,mw3,mw4, (req,res)=> console.log("final callback") );
app.post("/test", mw1,mw2,mw3,mw4, (req,res)=> console.log("final callback") );


//simulate http-request
//app.run("get","/");
//app.run("get","/data");
//app.run("get","/data/cars");
app.run("post","/test");
//app.run("get","/data/34");




//app.show();



function mw1(req,res,next){ console.log("mw1")};
function mw2(req,res,next){ console.log("mw2")};
function mw3(req,res,next){ console.log("mw3")};
function mw4(req,res,next){ console.log("mw4")};