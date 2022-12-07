const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//Información de metadatos sobre la API

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRUD API LevelUp",
      version: "1.0.0",
    },
  },
  apis: ["./routes/routes.js"],
};

//DOC en formato JSON
const swaggerSpec = swaggerJSDoc(options);

//Función para mostrar la documentación en html y json
const swaggerDocs = (app, port) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`🔧 Documentación disponible en http://localhost:${port}/docs`);
};

module.exports = { swaggerDocs };
