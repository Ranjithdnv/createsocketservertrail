const { Server } = require( "socket.io")
const express = require('express')
const app = express()
 //const io = new Server({
//   cors: {
//     origin: "https://soclienttest.onrender.com:3000",
//   },
// });
// let onlineUsers = [];

// const addNewUser = (username, socketId) => {
//   !onlineUsers.some((user) => user.username === username) &&
//     onlineUsers.push({ username, socketId });
// };
// const getUser = (username) => {
//   return onlineUsers.find((user) => user.username === username);
// };
// const removeUser = (socketId) => {
//   onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
// };

// io.on("connection", (socket) => {
//   socket.on("newUser", (username) => {
//     addNewUser(username, socket.id);



//     console.log(onlineUsers)
//   })
//   socket.on("sendText", ({ senderName, receiverName, text }) => {
//     const receiver = getUser(receiverName);
//     console.log(receiver)
//     console.log(senderName)
//     console.log(receiverName)
//     console.log(text)


//     io.to(receiver?.socketId).emit("getText", {
//       senderName,
//       text,
//     });
//   });
 
//   socket.on("disconnect", () => {
//     removeUser(socket.id);
//     console.log(onlineUsers)
   
//   });

// });

app.get('/',async (req, res) => {
  

    res.send("success");
  

})

io.listen(5000)
app.listen(3001, () => {
  console.log("Server is running")
})
  