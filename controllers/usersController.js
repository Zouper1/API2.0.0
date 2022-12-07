const UsersData = require("../dataModels/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { KEY } = require("../config");



let newUser = {};
let users = [];

const register = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send("Debes indicar nombre, email, password");
    }

    const { name, email, password } = req.body;

    if (!(email && name && password)) {
      return res.status(400).send("Debes indicar nombre, email, password");
    }

    const userExists = users.find((user) => user.email === email);

    if (userExists) {
      res
        .status(400)
        .send(
          "El usuario existe, por favor inicia sesión con tus credenciales"
        );
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    newUser = UsersData.User(name, email, encryptedPassword);

    users = [...users, newUser];
  } catch (err) {
    console.log("Ha ocurrido un error", err);
  }

  return res.status(201).json(newUser);
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("Indica email y contraseña");
    }

    const user = users.find((us) => us.email === email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ email }, KEY, { expiresIn: "5h" });
      user.token = token;
      res.status(200).json(user);
    } else {
      return res.status(403).send("Credenciales inválidas");
    }
  } catch (err) {
    console.log("Ha ocurrido un error", err);
  }
};

const welcome = (req, res) => {
  res.status(200).send("Bienvenido a la API CRUD LevelUp");
};

module.exports = { register, login, welcome };
