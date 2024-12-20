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
const port = process.env.PORT || 3000;
const httpServer = createServer(app);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  transports: ["websocket"],
});

let liveId = process.env.LIVE_ID; // Inicialmente pega do .env
let tiktokConnection = null;

const startTikTokConnection = () => {
  if (tiktokConnection) {
    console.log(`Desconectando da conexão anterior com LIVE_ID: ${liveId}`);
    tiktokConnection.disconnect();
  }

  console.log(`Conectando ao TikTok Live com LIVE_ID: ${liveId}`);
  tiktokConnection = new WebcastPushConnection(liveId);

  const reconnect = (attempt = 1) => {
    console.log(`Tentando reconectar... tentativa ${attempt}`);

    tiktokConnection
      .connect()
      .then(() => {
        console.log(`Conectado ao TikTok Live: ${liveId}`);

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

// Rota para o painel de administração
app.get("/admin", (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Admin - Alterar LIVE_ID</h1>
        <form action="/update-live-id" method="POST">
          <label for="liveId">Novo LIVE_ID:</label>
          <input type="text" id="liveId" name="liveId" required>
          <button type="submit">Atualizar</button>
        </form>
      </body>
    </html>
  `);
});

// Rota para atualizar o LIVE_ID
app.post("/update-live-id", (req, res) => {
  const newLiveId = req.body.liveId;

  if (!newLiveId) {
    return res.status(400).send("LIVE_ID não pode ser vazio.");
  }

  liveId = newLiveId;
  console.log(`Novo LIVE_ID definido: ${liveId}`);
  startTikTokConnection();

  res.send(`
    <html>
      <body>
        <h1>LIVE_ID atualizado com sucesso!</h1>
        <p>Agora conectado ao LIVE_ID: ${liveId}</p>
        <a href="/admin">Voltar</a>
      </body>
    </html>
  `);
});

io.on("connection", (socket) => {
  console.log("Client connected to Socket.IO");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Rotas de exemplo
app.get("/emit", (req, res) => {
  io.emit("chat", { uniqueId: "user123", comment: "Hello, world!" });
  res.send("Emit enviado!");
});

// Servindo arquivos estáticos
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

httpServer.listen(port, () => {
  console.log(`Server listening on port: ${port}. http://localhost:${port}`);
});
