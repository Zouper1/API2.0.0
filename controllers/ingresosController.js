const IngresosService = require("../services/ingresosServices");

const getAllIncomes = (req, res) => {
  try {
    const allIncomes = IngresosService.getAllIncomes();
    res.send({ status: "OK", data: allIncomes });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "ERROR",
      data: { error: error?.message || error },
    });
  }
};

const getOneIncome = (req, res) => {
  const { id } = req.params;

  try {
    const income = IngresosService.getOneIncome(id);
    res.send({ status: "OK", data: income });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "ERROR",
      data: { error: error?.message || error },
    });
  }
};

const createNewIncome = (req, res) => {
  const {producto, cantidad } = req.body;

  if (!(producto && cantidad)) {
    return res.status(400).send({
      status: "ERROR",
      data: { error: "Faltan datos para crear un ingreso" },
    });
  }

  const newIncome = {
   
    producto: producto,
    cantidad: cantidad,
  };

  try {
    const createdIncome = IngresosService.createNewIncome(newIncome);
    res.status(201).send({ status: "OK",message: "Ingreso Creado", data: createdIncome });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "ERROR",
      data: { error: error?.message || error },
    });
  }
};



module.exports = {
  getAllIncomes,
  getOneIncome,
  createNewIncome,

};
