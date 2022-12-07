const DB = require("../database/db.json");
const { saveToDatabase } = require("../database/utils");

const getAllIncomes = () => {
  try {
    return DB.ingresos;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneIncome = (id) => {
  try {
    const income = DB.ingresos.find((income) => income.producto == id);

    if (!income) {
      throw {
        status: 400,
        message: `El producto '${id}' no existe para encontrarlo `,
      };
    }

    return income;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewIncome = (newIncome) => {


  DB.productos.forEach((producto) => {
    if (producto.id == newIncome.producto) {
      producto.stock += newIncome.cantidad;
    }
  });

  DB.ingresos.push(newIncome);
  saveToDatabase(DB);
  return newIncome;
};



module.exports = {
  getAllIncomes,
  getOneIncome,
  createNewIncome,
};
