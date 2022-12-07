const productServices = require("../services/productService");

//!
const getAllProducts = (req, res) => {
  try {
    const allProducts = productServices.getAllProducts();
    res.send({ status: "OK", data: allProducts });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "ERROR", data: { error: error?.message || error } });
  }
};

//!
const getOneProduct = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res
      .status(400)
      .send({ status: "ERROR", data: { error: "No se encontro esa ID" } });
    return;
  }
  try {
    const product = productServices.getOneProduct(id);
    res.send({ status: "OK", data: product });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "ERROR", data: { error: error?.message || error } });
  }
};

//!
const createNewProduct = (req, res) => {
  const { id, producto, marca, linea, precio, stock } = req.body;

  if (!(id && producto && marca && linea && precio && stock)) {
    return res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "Hace falta algunos de los siguientes campos: id, nombre, precio, cantidad",
      },
    });
  }

  const newProduct = {
    id: id,
    producto: producto,
    marca: marca,
    linea: linea,
    precio: precio,
    stock: stock,
  };
  try {
    const createdProduct = productServices.createNewProduct(newProduct);
    res.status(201).send({ status: "OK", data: createdProduct });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILDED", data: { error: error?.message || error } });
  }
};

//!
const updateOneProduct = (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  if (!id) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "No se encontro la id para actualizar" },
    });
  }

  try {
    const updatedProduct = productServices.updateOneProduct(id, body);
    res.status(200).send({ status: "OK", data: updatedProduct });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//!
const deleteOneProduct = (req, res) => {
 

  const { id } = req.params;

  if (!id) {
    res
      .status(400)
      .send({ status: "ERROR", data: { error: "No se encontro esa ID" } });
    return;
  }
  try {
    const deletedProduct = productServices.deleteOneProduct(id);
    res.send({ status: "OK", message: "Producto eliminado", data: deletedProduct });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "ERROR",
      data: { error: error?.message || error },
    });
  }
};

const seeDeleted = (req, res) => {
  try {
    const deleted = productServices.seeDeleted();
    res.send({ status: "OK", data: deleted });
  } catch (error) {
    res

      .status(error?.status || 500)
      .send({ status: "ERROR", data: { error: error?.message || error } });
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
