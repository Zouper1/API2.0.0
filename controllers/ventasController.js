const VentasService = require("../services/ventasService");

const getAllSales = (req, res) => {
  try {
    const allSales = VentasService.getAllSales();
    res.send({ status: "OK", data: allSales });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "ERROR",
      data: { error: error?.message || error },
    });
  }
};

const getOneSale = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res
      .status(400)
      .send({ status: "ERROR", data: { error: "No se encontro esa ID" } });
    return;
  }
  try {
    const sale = VentasService.getOneSale(id);
    res.send({ status: "OK", data: sale });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "ERROR",
      data: { error: error?.message || error },
    });
  }
};

const createNewSale = (req, res) => {
  const { productoV, cantidadV } = req.body;

  if (!( productoV && cantidadV)) {
    res.status(400).send({ status: "ERROR", data: { error: "Faltan datos" } });
    return;
  }
  const newSale = {
    
    productoV: productoV,
    cantidadV: cantidadV,
   
   
  };
  console.log(newSale);
  try {
    const createdSale = VentasService.createNewSale(newSale);
    res.status(201).send({ status: "OK", message: "Venta Creada", data: createdSale });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "ERROR",
      data: { error: error?.message || error },
    });
  }
};



module.exports = {
  getAllSales,
  getOneSale,
  createNewSale,

};
