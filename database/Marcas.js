const DB = require("../database/db.json");
const { saveToDatabase } = require("../database/utils");

const getAllBrands = () => {
  try {
    return DB.marcas;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneBrand = (id) => {
  try {
    const brand = DB.marcas.find((brand) => brand.id == id);

    if (!brand) {
      throw {
        status: 400,
        message: `El Id '${id}' no existe para encontrarlo `,
      };
    }

    return brand;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewBrand = (newBrand) => {
  try {
    const isAlreadyAdded =
      DB.marcas.findIndex((brand) => brand.id === newBrand.id) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Ya existe una marca con la Id '${newBrand.id}'  `,
      };
    }

    DB.marcas.push(newBrand);
    saveToDatabase(DB);
    return newBrand;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const updateOneBrand = (id, changes) => {
  try {
    const indexForUpdate = DB.marcas.findIndex((brand) => brand.id == id);

    if (indexForUpdate < 0) {
      throw {
        status: 400,
        message: `El Id '${id}' no existe para actualizarlo `,
      };
    }

    DB.marcas[indexForUpdate] = {
      ...DB.marcas[indexForUpdate],
      ...changes,
    };
    saveToDatabase(DB);
    return DB.marcas[indexForUpdate];
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneBrand = (id) => {
  try {
    const indexForDelete = DB.marcas.findIndex((brand) => brand.id == id);

    if (indexForDelete < 0) {
      throw {
        status: 400,
        message: `El Id '${id}' no existe para eliminarlo `,
      };
    }

    const deletedBrand = {
      id: DB.marcas[indexForDelete].id,
      nombre: DB.marcas[indexForDelete].nombre,
      eliminado: true,
    };

    DB.marcas[indexForDelete] = deletedBrand;
    saveToDatabase(DB);
    return deletedBrand;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const seeDeleted = () => {
  try {
    const deletedBrands = DB.marcas.filter((brand) => brand.eliminado === true);
    return deletedBrands;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  } 
};

module.exports = {
  getAllBrands,
  getOneBrand,
  createNewBrand,
  updateOneBrand,
  deleteOneBrand,
  seeDeleted,
};
