
module.exports = {
    routes : {GET:{}, POST:{}, param:{}},
    get: function(path, callback){

        if(this.getParamPath(path))
        {
            console.log(path);
            this.routes.param[this.getParamPath(path)] = [callback, path];
        }
        else
        {
            this.routes.GET[path.toLowerCase()] = callback;
        }
        
    },
    post: function(path, callback){

            this.routes.POST[path.toLowerCase()] = callback;
    },

    run: function(req,res){

    
        if(this.routes[req.method][req.url.toLowerCase()])
        this.routes[req.method][req.url.toLowerCase()](req,res);
        else if(this.routes.param)
        {
            let possibleRoutes = this.getPossibleRoutes(req.url.toLowerCase());
            let route = this.findParamRoute(possibleRoutes);
     
            if(this.routes.param[route])
            {
                let params = this.getParams(req.url, route);
                req.params = params;
                let orgPath = this.routes.param[route][1];
                // Skicka denna och skapa objekt på orden efter :
                // bygg sedan ihop denna med params i rätt ordning..

                this.routes.param[route][0](req,res);
            }
            
            else res.end("404 params");
        }
        else if(this.routes[req.method]['/*'])
        this.routes[req.method]['/*'](req,res);
        else 
        res.end("404");
    },
    show: function(){

        console.log(this.routes);
    },


    getParams : function(url, route){

            let arr = (url.split(route)[1]).split("/");
            console.log(url);
            console.log(route);
            console.log(arr);
            
  
            let params = arr.filter(item => item);

            console.log(params);
            return params;
    },
    
    getParamPath: function(route){
       
        let i = route.search("/:");
        let path = route.substring(0,i);
        if(i<0)
        return false;
        else
        return path;
    
    } ,
    getPossibleRoutes : function(path)
    {
            
        let pathArr = path.split("/");
        pathArr.shift();
        //console.log(pathArr);

        // lägg till slash på första elementet.
        pathArr[0] = "/"+pathArr[0]
        let paths = [];
        getAllPaths(pathArr);
        //console.log("paths:",paths);
        function getAllPaths(path)
        {

            paths.push(path.join("/"));
            path.pop();
            if(path.length>0)
            getAllPaths(path);
            else return true;

        }
        return paths;




    },

    findParamRoute : function(possibleRoutes){


        let route = possibleRoutes.find(r=>{
            return this.routes.param[r];
        });
        if(route) return route;
        else return false;

    }





}