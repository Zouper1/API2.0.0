const MarcasService = require("../services/marcasServices");

const getAllBrands = (req, res) => {
  try {
    const allBrands = MarcasService.getAllBrands();
    res.send({ status: "OK", data: allBrands });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "ERROR",
      data: { error: error?.message || error },
    });
  }
};

const getOneBrand = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res
      .status(400)
      .send({ status: "ERROR", data: { error: "No se encontro esa ID" } });
    return;
  }
  try {
    const brand = MarcasService.getOneBrand(id);
    res.send({ status: "OK", data: brand });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "ERROR",
      data: { error: error?.message || error },
    });
  }
};

const createNewBrand = (req, res) => {
  const { id, nombre } = req.body;

  if (!(id && nombre)) {
    return res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "Hace falta algunos de los siguientes campos: id, nombre, eliminado",
      },
    });
  }

  const newBrand = {
    id: id,
    nombre: nombre,
  };
  try {
    const createdBrand = MarcasService.createNewBrand(newBrand);
    return res.status(201).send({ status: "OK", data: createdBrand });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "ERROR",
      data: { error: error?.message || error },
    });
  }
};

const updateOneBrand = (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (!id) {
    res
      .status(400)
      .send({ status: "ERROR", data: { error: "No se encontro esa ID" } });
    return;
  }
  try {
    const updatedBrand = MarcasService.updateOneBrand(id, changes);
    res.send({ status: "OK", data: updatedBrand });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "ERROR",
      data: { error: error?.message || error },
    });
  }
};

const deleteOneBrand = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res
      .status(400)
      .send({ status: "ERROR", data: { error: "No se encontro esa ID" } });
    return;
  }
  try {
    const deletedBrand = MarcasService.deleteOneBrand(id);
    res.send({ status: "OK", message: "Marca eliminada", data: deletedBrand });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "ERROR",
      data: { error: error?.message || error },
    });
  }
};

const seeDeleted = (req, res) => {
  try {
    const deleted = MarcasService.seeDeleted();
    res.send({ status: "OK", data: deleted });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "ERROR",
      data: { error: error?.message || error },
    });
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

//Product
