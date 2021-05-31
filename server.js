const WebSocket = require('ws');
const port = process.env.PORT || 8989;
const wss = new WebSocket.Server({ port });
wss.on('connection', function connection(ws, req) {
	const ip = req.socket.remoteAddress;
	const id = req.headers['sec-websocket-key'];


  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
    client.send('"message":"'+data+'"');
      }
    });
  });
    ws.on('close', function incoming(data)  {
         wss.clients.forEach(function each(client) {
         if (client.readyState === WebSocket.OPEN) {
           client.send('"message":"closed"');
      }
    });
    });
});
