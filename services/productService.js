const Products = require("../database/Products");

const getAllProducts = () => {
  const allProducts = Products.getAllProducts();
  return allProducts;
};

const getOneProduct = (id) => {
  const oneProduct = Products.getOneProduct(id);
  return oneProduct;
  
};

const createNewProduct = (newProduct) => {
  const productToInsert = {
    ...newProduct,
    eliminado: false,
  };
  const createdProduct = Products.createNewProduct(productToInsert);
  return createdProduct;
};

const updateOneProduct = (id, changes) => {

  const updatedProduct = Products.updateOneProduct(id, changes);
  return updatedProduct;
};

const deleteOneProduct = (id) => {
  Products.deleteOneProduct(id);
};

const seeDeleted = () => {
  const deleted = Products.seeDeleted();
  return deleted;
};


module.exports = {
  getAllProducts,
  getOneProduct,
  createNewProduct,
  updateOneProduct,
  deleteOneProduct,
  seeDeleted,
  
};
