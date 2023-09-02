const { Server } = require( "socket.io")

const io = new Server({
  cors: {
    origin: "https://soclienttest.onrender.com/",
  },
});
let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};
const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};
const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);



    console.log(onlineUsers)
  })
  socket.on("sendText", ({ senderName, receiverName, text }) => {
    const receiver = getUser(receiverName);
    console.log(receiver)
    console.log(senderName)
    console.log(receiverName)
    console.log(text)


    io.to(receiver?.socketId).emit("getText", {
      senderName,
      text,
    });
  });
 
  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log(onlineUsers)
   
  });

});


  io.listen(5000);