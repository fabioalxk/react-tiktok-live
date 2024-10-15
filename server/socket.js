import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { WebcastPushConnection } from "tiktok-live-connector";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3000;
const httpServer = createServer(app);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  transports: ["websocket"],
});

const liveId = process.env.LIVE_ID;

if (!liveId) {
  console.error("Error: LIVE_ID is missing from env variables.");
  process.exit(1);
}

let tiktokConnection = null;

const startTikTokConnection = () => {
  tiktokConnection = new WebcastPushConnection(liveId);

  tiktokConnection
    .connect()
    .then((state) => {
      console.log(`Connected to a live in TikTok: ${liveId}`);

      tiktokConnection.on("chat", (data) => {
        console.log(`${data.uniqueId} escreve: ${data.comment}`);

        io.emit("chat", {
          uniqueId: data.uniqueId,
          comment: data.comment,
        });
      });
    })
    .catch((err) => {
      console.error("Erro ao conectar ao TikTok Live:", err);
    });
};

startTikTokConnection();

io.on("connection", (socket) => {
  console.log("Client connected to Socket.IO");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Rota simples para testar o servidor
app.get("/", (req, res) => {
  res.send("Server Socket.IO running...");
});

app.get("/emit1", (req, res) => {
  console.log("emit1", req.query.user);
  io.emit("chat", {
    uniqueId: req.query.user,
    comment: "1",
  });
  return res.send(`
    <html>
      <head>
        <style>
          body {
            background-color: black;
            color: white;
            font-family: Arial, sans-serif;
          }
        </style>
      </head>
      <body>
        <h1>Emit 1 Response</h1>
        <p>uniqueId: "fabio"</p>
        <p>comment: "1"</p>
      </body>
    </html>
  `);
});

app.get("/emit2", (req, res) => {
  console.log("emit2");
  io.emit("chat", {
    uniqueId: "fabio",
    comment: "2",
  });
  return res.send(`
    <html>
      <head>
        <style>
          body {
            background-color: black;
            color: white;
            font-family: Arial, sans-serif;
          }
        </style>
      </head>
      <body>
        <h1>Emit 1 Response</h1>
        <p>uniqueId: "fabio"</p>
        <p>comment: "2"</p>
      </body>
    </html>
  `);
});

// Inicia o servidor HTTP
httpServer.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
