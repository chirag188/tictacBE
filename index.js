const app = require("express")();
const http = require("http").Server(app);
var cors = require("cors");
const io = require("socket.io")(http);
const port = process.env.PORT || 8000;
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("boardwidth", (msg) => {
    console.log(msg);
    io.emit("boardwidth", msg);
  });
  socket.on("move", (i, j) => {
    console.log(i, j);
    io.emit("move", i, j);
  });
  socket.on("player", (i, j) => {
    console.log(i, j);
    io.emit("player", i, j);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
