import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { WebcastPushConnection } from "tiktok-live-connector";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { generateRandomGift } from "./randomGifts.js";

dotenv.config();

const app = express();
const port = 3000;
const httpServer = createServer(app);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  console.error("❌ Error: LIVE_ID is missing from env variables.");
  process.exit(1);
}

let tiktokConnection = null;

const startTikTokConnection = () => {
  console.log("liveId", liveId);
  tiktokConnection = new WebcastPushConnection(liveId);

  const reconnect = (attempt = 1) => {
    console.log(`Tentando reconectar... tentativa ${attempt}`);

    tiktokConnection
      .connect()
      .then((state) => {
        console.log(`Reconectado ao TikTok Live: ${liveId}`);

        tiktokConnection.on("chat", (data) => {
          console.log(`${data.uniqueId} escreve: ${data.comment}`);

          io.emit("chat", {
            uniqueId: data.uniqueId,
            comment: data.comment,
          });
        });

        tiktokConnection.on("gift", (data) => {
          if (data.diamondCount > 1) {
            console.log(`${data}`);
          }

          io.emit("gift", {
            userId: data.userId,
            username: data.uniqueId,
            giftName: data.giftName,
            giftCount: data.repeatCount,
            profilePictureUrl: data.profilePictureUrl,
            giftPictureUrl: data.giftPictureUrl,
            diamondCount: data.diamondCount,
          });
        });

        tiktokConnection.on("disconnected", () => {
          console.error("❌ Desconectado do TikTok Live.");
          setTimeout(() => reconnect(attempt + 1), 5000);
        });
      })
      .catch((err) => {
        console.error(
          `❌ Erro ao reconectar ao TikTok Live:`,
          "status: " + err?.response?.status
        );

        if (attempt < 5) {
          setTimeout(() => reconnect(attempt + 1), 5000);
        } else {
          console.error(
            "❌❌ Não foi possível reconectar após várias tentativas."
          );
        }
      });
  };

  reconnect();
};

startTikTokConnection();

io.on("connection", (socket) => {
  console.log("Client connected to Socket.IO");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const users = Array.from({ length: 500 }, (_, i) => ({
  uniqueId: `user${i + 1}`,
}));

const getRandomComment = () => {
  return Math.random() < 0.5 ? "1" : "2";
};

app.get("/emit", (req, res) => {
  users.forEach((user) => {
    const randomComment = getRandomComment();

    io.emit("chat", {
      uniqueId: user.uniqueId,
      comment: randomComment,
    });
  });

  return res.send("Emits sent to 500 users.");
});

app.get("/emit-gifts", (req, res) => {
  for (let i = 0; i < 100; i++) {
    const randomGift = generateRandomGift();
    io.emit("gift", randomGift);
  }

  return res.send("Emits de presentes enviados.");
});

app.get("/emit-gifts-1", (req, res) => {
  const randomGift = generateRandomGift();
  io.emit("gift", randomGift);

  return res.send("Emit de 1 presente enviado.");
});

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

httpServer.listen(port, () => {
  console.log(`Server listening on port: ${port}. http://localhost:3000`);
});
