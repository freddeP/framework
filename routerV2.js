function init(){

    let routes = [];

    function getParams(path){
        let pathArr = path.split("/");
        let params = pathArr.filter(p=>p.search(":")>-1);
        return params;
    }
    function hasParams(path){
        if(path.search(":")>-1) return true
        return false;
    }
    function getParamRoutes(){
        return routes.filter(r => r.params.length>0);
    }
    function checkParamRoutes(path){

        let paramRoutes = getParamRoutes();
        paramRoutes = paramRoutes.filter(r=> getPathSize(r.path) == getPathSize(path));

        console.log("possible routes: ", paramRoutes);

    }
    function getPathArr(path){
        return path.split("/").filter(p => p!="");
    }
    function getPathSize(path){
        return getPathArr(path).length;
    }

    return {
        get: function(path, callback){
         
            let params = hasParams(path) ? getParams(path) : [];
            params = params.map(p => p.replace(":","") );

            routes.push({path,callback, method:"get",params});
        },
        show: function()
        {
            return routes;
        },
        showParamRoutes: function()
        {
            return getParamRoutes();
        },
        // funktion som simulerar att det kommer en http-req med path
        run: function(path){

            let route = routes.find(r=>r.path === path);
            if(route) route.callback();
            else{ 
                route = checkParamRoutes(path);
                if(route){
                    route.callback();
                }
                else{
                    return (()=>{console.log("status: 404")})();
                }

            }

        }
    
    }



}
//initierar app med funktionen init.
let app = init();

app.get("/test", ()=>{console.log("from callback")});
app.get("/test/:id", ()=>{console.log("from callback with id")});


app.get("/test/:id/about/:author", ()=>{console.log("from callback param")});
console.log(app.showParamRoutes());

let route = process.env.TEST || "/test2";
//console.log(process.env.TEST);
app.run("/"+route);