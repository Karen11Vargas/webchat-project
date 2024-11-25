const express = require("express");
const {createServer} = require("http");
const realtimeServer = require("./realtimeServer");
const path = require("path");
const cookieParser = require("cookie-parser") 

//Craer servidor
const app = express();
const httpServer = createServer(app);

//Settings
app.set("port", process.env.PORT || 3000 );
app.set("views", path.join(__dirname, "views"))
app.use(cookieParser())

//Rutas
app.use(require("./routes"));

//Public 
app.use( express.static(path.join(__dirname, "public")));

//Levantar servidor
httpServer.listen( app.get("port"), () =>{
    console.log("Corriendo", app.get("port"));
})

//Llamar servidor socket
realtimeServer(httpServer);