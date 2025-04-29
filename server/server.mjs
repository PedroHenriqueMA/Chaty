import http from 'http';
import {WebSocketServer} from 'ws';

const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Cliente conectado' );

  ws.on('message', (data) => {
    wss.clients.forEach((client) =>{
        if (client.readyState === WebSocket.OPEN) {
          client.send(data.toString());
        }
      })
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });

});

const PORT = process.env.PORT | 300;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});