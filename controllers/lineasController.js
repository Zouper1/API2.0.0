const LineasService = require("../services/lineasServices");

const getAllLines = (req, res) => {
  try {
    const allLines = LineasService.getAllLines();
    res.send({ status: "OK", data: allLines });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "ERROR",
      data: { error: error?.message || error },
    });
  }
};

const getOneLine = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res
      .status(400)
      .send({ status: "ERROR", data: { error: "No se encontro esa ID" } });
    return;
  }
  try {
    const line = LineasService.getOneLine(id);
    res.send({ status: "OK", data: line });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "ERROR",
      data: { error: error?.message || error },
    });
  }
};

const createNewLine = (req, res) => {
  const { id, nombre } = req.body;

  if (!(id && nombre)) {
    res.status(400).send({
      status: "ERROR",
      data: { error: "Faltan datos para crear una nueva linea" },
    });
    return;
  }

  const newLine = {
    id: id,
    nombre: nombre,
  };
  try {
    const createdLine = LineasService.createNewLine(newLine);
    return res.status(201).send({ status: "OK", data: createdLine });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "ERROR",
      data: { error: error?.message || error },
    });
  }
};

const updateOneLine = (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (!id) {
    res
      .status(400)
      .send({ status: "ERROR", data: { error: "No se encontro esa ID" } });
    return;
  }
  try {
    const updatedLine = LineasService.updateOneLine(id, changes);
    res.send({ status: "OK", data: updatedLine });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "ERROR",
      data: { error: error?.message || error },
    });
  }
};

const deleteOneLine = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res
      .status(400)
      .send({ status: "ERROR", data: { error: "No se encontro esa ID" } });
    return;
  }
  try {
    const deletedLine = LineasService.deleteOneLine(id);
    res.send({ status: "OK", message: "Linea eliminada", data: deletedLine });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "ERROR",
      data: { error: error?.message || error },
    });
  }
};

const seeDeleted = (req, res) => {
  try {
    const deleted = LineasService.seeDeleted();
    res.send({ status: "OK", data: deleted });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "ERROR",
      data: { error: error?.message || error },
    });
  }
};

module.exports = {
  getAllLines,
  getOneLine,
  createNewLine,
  updateOneLine,
  deleteOneLine,
  seeDeleted,
};
