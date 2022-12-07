const Ingresos = require("../database/Ingresos");

const getAllIncomes = () => {
  const allIncomes = Ingresos.getAllIncomes();
  return allIncomes;
};

const getOneIncome = (id) => {
  const oneIncome = Ingresos.getOneIncome(id);
  return oneIncome;
};

const createNewIncome = (newIncome) => {
  const incomeToInsert = {
    ...newIncome,
    createdAt: new Date().toLocaleString("es-GT", {
      timeZone: "America/Guatemala",
    }),
  };

  const createdIncome = Ingresos.createNewIncome(incomeToInsert);
  return createdIncome;
};



module.exports = {
  getAllIncomes,
  getOneIncome,
  createNewIncome,
  // updateOneIncome,
  // deleteOneIncome,
};
