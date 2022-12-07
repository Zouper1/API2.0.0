const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const routes = require("./routes/routes");
const { swaggerDocs } = require("./routes/swagger");
const { PORT } = require("./config");





app.use(express.json());

swaggerDocs(app, PORT);
routes(app);

server.listen(PORT, () => {
  console.log(`🔑 Servidor creado en el puerto ${PORT} `);
  
});
