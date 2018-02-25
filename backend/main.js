const {
  httpServer,
  httpsWsServer,
} = require('./socket.js');

httpServer.listen(80);
httpsWsServer.listen(443);
