const DB = require("../database/db.json");
const { saveToDatabase } = require("../database/utils");

const getAllLines = () => {
  try {
    return DB.lineas;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneLine = (id) => {
  try {
    const line = DB.lineas.find((line) => line.id == id);

    if (!line) {
      throw {
        status: 400,
        message: `El Id '${id}' no existe para encontrarlo `,
      };
    }

    return line;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewLine = (newLine) => {
  try {
    const isAlreadyAdded =
      DB.lineas.findIndex((line) => line.id === newLine.id) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Ya existe una linea con la Id '${newLine.id}'  `,
      };
    }

    DB.lineas.push(newLine);
    saveToDatabase(DB);
    return newLine;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const updateOneLine = (id, changes) => {
  try {
    const indexForUpdate = DB.lineas.findIndex((line) => line.id == id);

    if (indexForUpdate < 0) {
      throw {
        status: 400,
        message: `El Id '${id}' no existe para actualizarlo `,
      };
    }

    DB.lineas[indexForUpdate] = {
      ...DB.lineas[indexForUpdate],
      ...changes,
    };
    saveToDatabase(DB);
    return DB.lineas[indexForUpdate];
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneLine = (id) => {
  try {
    const indexForDelete = DB.lineas.findIndex((line) => line.id == id);

    if (indexForDelete < 0) {
      throw {
        status: 400,
        message: `El Id '${id}' no existe para eliminarlo `,
      };
    }

    const deletedBrand = {
      id: DB.lineas[indexForDelete].id,
      nombre: DB.lineas[indexForDelete].nombre,
      eliminado: true,
    }
    
    DB.lineas[indexForDelete] = deletedBrand;
    saveToDatabase(DB);
    return deletedBrand;

  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const seeDeleted = () => {
  try {
    const deleted = DB.lineas.filter((line) => line.eliminado === true);
    return deleted;
  } catch (error) {
    throw { status: 500, message: error };
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
