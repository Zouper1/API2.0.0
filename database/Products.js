const DB = require("../database/db.json");
const { saveToDatabase } = require("../database/utils");

//! Obtner todos los productos
const getAllProducts = () => {
  try {
    return DB.productos;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

//! Obtener un producto por id

const getOneProduct = (id) => {
  try {
    const product = DB.productos.find((product) => product.id == id);

    if (!product) {
      throw {
        status: 400,
        message: `El Id '${id}' no existe para encontrarlo `,
      };
    }

    return product;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

//! Crear un nuevo producto

const createNewProduct = (newProduct) => {
  try {
    const isAlreadyAdded =
      DB.productos.findIndex((product) => product.id === newProduct.id) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Ya existe un producto con la Id '${newProduct.id}'  `,
      };
    }

    DB.productos.push(newProduct);
    saveToDatabase(DB);
    return newProduct;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

//! Actualizar un producto
const updateOneProduct = (id, changes) => {
  try {
    const indexForUpdate = DB.productos.findIndex(
      (product) => product.id == id
    );

    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `El Id '${id}' no existe para actualizarlo `,
      };
    }

    const updatedProduct = {
      ...DB.productos[indexForUpdate],
      ...changes,
    };

    DB.productos[indexForUpdate] = updatedProduct;
    saveToDatabase(DB);
    return updatedProduct;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

//! Eliminar un producto
const deleteOneProduct = (id) => {
  try {
    const indexForDelete = DB.productos.findIndex((brand) => brand.id == id);

    if (indexForDelete < 0) {
      throw {
        status: 400,
        message: `El Id '${id}' no existe para eliminarlo `,
      };
    }

    const deletedBrand = {
      id: DB.productos[indexForDelete].id,
      producto: DB.productos[indexForDelete].producto,
      marca: DB.productos[indexForDelete].marca,
      linea: DB.productos[indexForDelete].linea,
      precio: DB.productos[indexForDelete].precio,
      stock: DB.productos[indexForDelete].stock,
      eliminado: true,
    }
    
    DB.productos[indexForDelete] = deletedBrand;
    saveToDatabase(DB);
    return deletedBrand;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const seeDeleted = () => {
  try {
    const deleted = DB.productos.filter((product) => product.eliminado === true);
    return deleted;
  } catch (error) {
    throw { status: 500, message: error };
  }
};



module.exports = {
  getAllProducts,
  getOneProduct,
  createNewProduct,
  updateOneProduct,
  deleteOneProduct,
  seeDeleted,
};
