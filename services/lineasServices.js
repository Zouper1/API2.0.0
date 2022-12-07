const Lineas = require("../database/Lineas");

const getAllLines = () => {
  const allLines = Lineas.getAllLines();
  return allLines;
};

const getOneLine = (id) => {
  const oneLine = Lineas.getOneLine(id);
  return oneLine;
};

const createNewLine = (newLine) => {
  const lineToInsert = {
    ...newLine,
    eliminado: false,
  };
  const createdLine = Lineas.createNewLine(lineToInsert);
  return createdLine;
};

const updateOneLine = (id, changes) => {
  const updatedLine = Lineas.updateOneLine(id, changes);
  return updatedLine;
};

const deleteOneLine = (id) => {
  Lineas.deleteOneLine(id);
};

const seeDeleted = () => {
  const deleted = Lineas.seeDeleted();
  return deleted;
};


module.exports = {
  getAllLines,
  getOneLine,
  createNewLine,
  updateOneLine,
  deleteOneLine,
  seeDeleted,
};
