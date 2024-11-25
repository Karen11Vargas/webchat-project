module.exports = httpServer =>{
    const {Server} = require("socket.io")
    const io = new Server(httpServer);

    io.on("connection", socket =>{
       
        //Acceder a una cookie 
        const cookie= socket.handshake.headers.cookie;
        const username = cookie.split("=").pop();

        //Escuchar evento del mensaje
        socket.on("send-message", message =>{
            io.emit("message",{
                user: username,
                message
            });
        })
    })
}