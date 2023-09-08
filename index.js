// const { Server } = require("socket.io");
// const express = require("express");
// const app = express();
// const io = new Server({
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });
//---
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "https://big-4bxu.onrender.com/ ", //https://future-together.onrender.com    //https://soclienttest.onrender.com //https://big-4bxu.onrender.com/
    methods: ["GET", "POST"],
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

    console.log(onlineUsers);
  });
  socket.on("sendText", ({ message, mname, mid }) => {
    const receiver = getUser(mname);
    console.log(message);
    console.log(mname);
    console.log(mid);
    console.log("socket-get");

    io.to(receiver?.socketId).emit("getText", {
      message: message,
      mname: mname,
      mid: mid,
    });
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log(onlineUsers);
  });
});

app.get("/", async (req, res) => {
  res.send("success");
});

// io.listen(5000);

server.listen(5000, () => console.log("server is running on port 5000"));
