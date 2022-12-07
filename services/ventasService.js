const Ventas = require("../database/Ventas");

const getAllSales = () => {
  const allSales = Ventas.getAllSales();
  return allSales;
};

const getOneSale = (id) => {
  const oneSale = Ventas.getOneSale(id);
  return oneSale;
};

const createNewSale = (newSale) => {
  const saleToInsert = {
    ...newSale,
    createdAt: new Date().toLocaleString("es-GT", {
      timeZone: "America/Guatemala",
    }),
  };
  const createdSale = Ventas.createNewSale(saleToInsert);
  return createdSale;
};



module.exports = {
  getAllSales,
  getOneSale,
  createNewSale,
  // updateOneSale,
  // deleteOneSale,
};
