// Importações em ESM
import express from "express";
import { WebSocketServer } from "ws"; // Importando WebSocket para ESM
import { WebcastPushConnection } from "tiktok-live-connector"; // Importando TikTok connector para ESM

// Inicializa o servidor Express
const app = express();
const port = 3000;

// Inicializa o WebSocket Server
const wss = new WebSocketServer({ noServer: true });

let tiktokConnection = null; // Para armazenar a conexão com o TikTok

// Configura o WebSocket Server
wss.on("connection", (ws) => {
  console.log("Cliente conectado ao WebSocket");

  ws.on("message", (message) => {
    const liveId = message.toString(); // O ID da live enviado pelo frontend

    // Conecta ao TikTok Live usando o tiktok-live-connector
    tiktokConnection = new WebcastPushConnection(liveId);

    tiktokConnection
      .connect()
      .then((state) => {
        console.log(`Conectado à live de TikTok: ${liveId}`);

        // Escuta eventos de mensagens de chat
        tiktokConnection.on("chat", (data) => {
          // Envia as mensagens de chat para o cliente via WebSocket
          console.log(`${data.uniqueId} writes: ${data.comment}`);
          ws.send(
            JSON.stringify({
              type: "chat",
              uniqueId: data.uniqueId,
              comment: data.comment,
            })
          );
        });
      })
      .catch((err) => {
        console.error("Erro ao conectar ao TikTok Live:", err);
        ws.send(JSON.stringify({ error: "Erro ao conectar ao TikTok Live" }));
      });
  });

  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
});

// Rota simples para o Express
app.get("/", (req, res) => {
  res.send("Servidor WebSocket rodando...");
});

// Inicia o servidor HTTP com WebSocket
const server = app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Habilita o WebSocket para o servidor HTTP
server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});
