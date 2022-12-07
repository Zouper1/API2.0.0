const Error404 = (req, res) => {
  res.status(404).send(`Error 404: ${req.url} no existe`);
}

module.exports = {Error404}