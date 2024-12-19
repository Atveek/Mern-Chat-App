const express = require("express");
const connectDB = require("./db.js");
const cors = require("cors");
const http = require("http");
const PORT = 8080;
const router = require("./Routes/auth_routes.js");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/user", router);
app.use("/message", require("./Routes/message_routes.js"));
app.use("/conversation", require("./Routes/conversation_routes.js"));

// Server setup
const server = http.createServer(app);

// Socket.io setup
require("./socket.js")(server); // Initialize socket.io logic

// Start server and connect to database
server.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
  connectDB();
});
