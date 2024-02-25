// server.js
const express = require("express");
// const http = require("http");
const mongoose = require("mongoose");
// const socketIo = require("socket.io");
// const VideoCall = require("./models/videoCall");
// const path = require('path');
const indexRouter = require('./server/router/index')
const cors =require('cors')

const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);
app.use(cors())
app.use(express.urlencoded())
app.use(express.Router())
app.use('/',indexRouter)

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/user").then(()=>{
  console.log('db connected')
});


// app.use(express.static(path.join(__dirname, 'public')));
// // WebSocket connection
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("call", async ({ from, to }) => {
//     try {
//       const newCall = await VideoCall.create({
//         from,
//         to,
//         status: "Ongoing",
//       });
//       io.to(to).emit("incomingCall", { callId: newCall._id, from });
//     } catch (error) {
//       console.error("Error initiating call:", error);
//     }
//   });

//   socket.on("acceptCall", async ({ callId }) => {
//     try {
//       await VideoCall.findByIdAndUpdate(callId, { status: "Ongoing" });
//     } catch (error) {
//       console.error("Error accepting call:", error);
//     } 
//   }); 

//   socket.on("rejectCall", async ({ callId }) => {
//     try {
//       await VideoCall.findByIdAndUpdate(callId, {
//         status: "Ended",
//         verdict: "Denied",
//       });
//     } catch (error) {
//       console.error("Error rejecting call:", error);
//     }
//   });

//   socket.on("endCall", async ({ callId }) => {
//     try {
//       await VideoCall.findByIdAndUpdate(callId, {
//         status: "Ended",
//         endedAt: Date.now(),
//       });
//     } catch (error) {
//       console.error("Error ending call:", error);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
//   });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports =app; 
