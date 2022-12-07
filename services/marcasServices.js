const Marcas = require("../database/Marcas");

const getAllBrands = () => {
  const allBrands = Marcas.getAllBrands();
  return allBrands;
};

const getOneBrand = (id) => {
  const oneBrand = Marcas.getOneBrand(id);
  return oneBrand;
};

const createNewBrand = (newBrand) => {
  const brandToInsert = {
    ...newBrand,
    eliminado: false,
  };
  const createdBrand = Marcas.createNewBrand(brandToInsert);
  return createdBrand;
};

const updateOneBrand = (id, changes) => {
  const updatedBrand = Marcas.updateOneBrand(id, changes);
  return updatedBrand;
};

const deleteOneBrand = (id) => {
  Marcas.deleteOneBrand(id);
};

const seeDeleted = () => {
  const deleted = Marcas.seeDeleted();
  return deleted;
};

module.exports = {
  getAllBrands,
  getOneBrand,
  createNewBrand,
  updateOneBrand,
  deleteOneBrand,
  seeDeleted,
};
