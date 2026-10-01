const express = require("express");
const http = require("http");
const path = require("path");
const { ExpressPeerServer } = require("peer");

const app = express();
const server = http.createServer(app);
const PORT = Number(process.env.PORT) || 10000;

app.use(express.static(path.join(__dirname)));

// PeerServer handles WebRTC signaling. The actual game state remains peer-to-peer.
const peerServer = ExpressPeerServer(server, {
  path: "/",
  proxied: true,
  allow_discovery: false,
});
app.use("/peerjs", peerServer);

app.get("/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    game: "Cabezones FC ULTRA",
    tournamentBots: true,
    online: true,
  });
});

app.get("/api/info", (_req, res) => {
  res.json({
    name: "Cabezones FC ULTRA",
    modes: ["local 1v1", "tournament 2v2 vs 2 NPC", "online 1v1", "online 2v2"],
    botDifficulties: ["easy", "normal", "difficult", "extreme", "impossible"],
    powers: ["tele", "shield", "dribble"],
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Cabezones FC ULTRA escuchando en 0.0.0.0:${PORT}`);
});
