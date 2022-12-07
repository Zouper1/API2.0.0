const DB = require("../database/db.json");
const { saveToDatabase } = require("../database/utils");

const getAllSales = () => {
  try {
    return DB.ventas;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneSale = (id) => {
  try {
    const sale = DB.ventas.find((sale) => sale.id == id);

    if (!sale) {
      throw {
        status: 400,
        message: `El Id '${id}' no existe para encontrarlo `,
      };
    }

    return sale;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewSale = (newSale) => {
 
  DB.productos.forEach((producto) => {
    if (producto.id == newSale.productoV) {
      producto.stock -= newSale.cantidadV;
    }
  });
  

  DB.ventas.push(newSale);
  saveToDatabase(DB);
  return newSale;
};



module.exports = {
  getAllSales,
  getOneSale,
  createNewSale,
};
