const auth = require("../middlewares/auth");
const controller = require("../controllers/usersController");
const productController = require("../controllers/productController");
const marcasController = require("../controllers/marcasController");
const lineasController = require("../controllers/lineasController");
const ventasController = require("../controllers/ventasController");
const ingresosController = require("../controllers/ingresosController");
const Error = require("../controllers/error");

const UserRoutes = (app) => {
  //? Inicio de Sesión
  app.post("/register", controller.register);

  /**
   * @openapi
   * /register:
   *  post:
   *   tags:
   *    - Inicio de Sesión:
   *   summary: Registra un nuevo usuario
   *   requestBody:
   *      required: true
   *      content:
   *          application/json:
   *              schema:
   *                  type: object
   *                  properties:
   *                      name:
   *                        type: string
   *
   *                      email:
   *                        type: string
   *
   *                      password:
   *                        type: string
   *
   *
   *   responses:
   *      201:
   *       description: Retorna usuario creado
   *       content:
   *          application/json:
   *              schema:
   *                  type: object
   *                  properties:
   *                      name:
   *                        type: string
   *                        example: Aron
   *                      email:
   *                        type: string
   *                        example: aron@gmail.com
   *                      password:
   *                        type: string
   *                        example: 123456
   *
   *      400:
   *       description: Ingresa todos los datos requeridos
   *       content:
   *          text/plain:
   *              schema:
   *                  type: string
   *                  example: Debes indicar nombre, email, password
   *      404:
   *       description: Usuario ya registrado
   *       content:
   *          text/plain:
   *             schema:
   *              type: string
   *              example: El usuario existe, por favor inicia sesión con tus credenciales
   */

  app.post("/login", controller.login);

  /**
   * @openapi
   * /login:
   *  post:
   *   tags:
   *    - Inicio de Sesión:
   *   summary: Inicia sesion con tus credenciales
   *   requestBody:
   *      required: true
   *      content:
   *          application/json:
   *              schema:
   *                  type: object
   *                  properties:
   *                      email:
   *                       type: string
   *
   *                      password:
   *                       type: string
   *
   *   responses:
   *      200:
   *        description: Retorna un token
   *        content:
   *          text/plain:
   *              schema:
   *                  type: object
   *                  properties:
   *                      token:
   *                        type: string
   *                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
   *      404:
   *        description: Devuelve un mensaje de error si no ingresas nada
   *        content:
   *          text/plain:
   *              schema:
   *                type: string
   *                example: Indica email y contraseña
   *      403:
   *        description: Credenciales invalidas
   *        content:
   *          text/plain:
   *              schema:
   *                  type: string
   *                  example: Credenciales invalidas
   */

  //? Bienvenida
  app.get("/welcome", controller.welcome);

  /**
   * @openapi
   * /welcome:
   *  get:
   *   tags:
   *    - Home:
   *   summary: Mensaje de bienvenida
   *   responses:
   *      200:
   *       description: Devuelve mensaje de bienvenida
   *       content:
   *          text/plain:
   *              schema:
   *                  type: string
   *                  example: Bienvenido!
   */

  //? Marcas
  app.get("/marcas", auth, marcasController.getAllBrands);

  /**
   * @openapi
   * /marcas:
   *  get:
   *   tags:
   *    - Marcas:
   *   summary: Muestra todas las marcas
   *   parameters:
   *      - in: header
   *        name: x-access-token
   *        schema:
   *          type: string
   *        required: true
   *   responses:
   *      200:
   *       description: Retorna un array de marcas
   *       content:
   *          application/json:
   *              schema:
   *                  type: array
   *                  items:
   *                    example: {
   *                     "id": 1, "nombre": "Adidas", "eliminado": false }
   */

  app.get("/marcas/:id", auth, marcasController.getOneBrand);

  /**
   * @openapi
   * /marcas/{id}:
   *  get:
   *   tags:
   *    - Marcas:
   *   summary: Muestra una marca con el ID ingresado
   *   parameters:
   *      - name: id
   *        in: path
   *        required: true
   *        description: Agregar un id
   *        schema:
   *          type: integer
   *      - name: x-access-token
   *        in: header
   *        schema:
   *          type: string
   *        description: Ingresa tu token!
   *        required: true
   *   responses:
   *      200:
   *       description: Devulve el producto con el id encontrado
   *       content:
   *          application/json:
   *              schema:
   *                  type: array
   *                  items:
   *                    example: {
   *                     "id": 2, "nombre": "Nike", "eliminado": false }
   *      404:
   *       description: Mensaje de error al no encontrar el producto
   *       content:
   *          application/json:
   *             schema:
   *                type: object
   *                properties:
   *                   error:
   *                      type: string
   *                      example: No se encontró la marca
   *
   */

  app.post("/marcas", auth, marcasController.createNewBrand);

  /**
   * @openapi
   * /marcas:
   *  post:
   *    tags:
   *      - Marcas:
   *    summary: Añadir Marcas
   *    requestBody:
   *      required: true
   *      content:
   *          application/json:
   *           schema:
   *              type: object
   *              properties:
   *                  id:
   *                      type: number
   *                  nombre:
   *                     type: string
   *
   *
   *    parameters:
   *      - name: x-access-token
   *        in: header
   *        description: Agrega tu token
   *        required: true
   *    responses:
   *      201:
   *        description: Da un mensaje de que se añadido la marca
   *        content:
   *          text/plain:
   *            schema:
   *                type: object
   *                properties:
   *                   message:
   *                      type: string
   *                      example: Marca añadida
   *      400:
   *        description: Mensaje de error
   *        content:
   *          text/plain:
   *             schema:
   *                type: object
   *                properties:
   *                   error:
   *                      type: string
   *                      example: No se encontró la marca con el id ingresado
   */

  app.put("/marcas/:id", auth, marcasController.updateOneBrand);

  /**
   * @openapi
   * /marcas/{id}:
   *  put:
   *   tags:
   *    - Marcas:
   *   summary: Editar un producto por ID
   *   requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *             type: object
   *             properties:
   *                id:
   *                   type: number
   *                nombre:
   *                   type: string
   *
   *
   *   parameters:
   *    - name: x-access-token
   *      in: header
   *      required: true
   *    - name: id
   *      in: path
   *      required: true
   *   responses:
   *    200:
   *     content:
   *       text/plain:
   *          schema:
   *                type: object
   *                properties:
   *                   message:
   *                      type: string
   *                      example: Marca actualizada
   *    400:
   *      content:
   *         text/plain:
   *             schema:
   *                type: object
   *                properties:
   *                   error:
   *                      type: string
   *                      example: No se encontró la id de la marca para actualizar
   */

  app.delete("/marcas/:id", auth, marcasController.deleteOneBrand);

  /**
   * @openapi
   * /marcas/{id}:
   *  delete:
   *    tags:
   *     - Marcas:
   *    summary: Eliminar un producto por ID
   *    parameters:
   *      - name: x-access-token
   *        in: header
   *        required: true
   *      - name: id
   *        in: path
   *        required: true
   *    responses:
   *      201:
   *        description: Devulve un mensaje de que se ha eliminado la marca
   *        content:
   *          text/plain:
   *             schema:
   *                type: object
   *                properties:
   *                   message:
   *                      type: string
   *                      example: Marca eliminada
   *      400:
   *       description: Mensaje de error
   *       content:
   *          text/plain:
   *             schema:
   *                type: object
   *                properties:
   *                   error:
   *                      type: string
   *                      example: No se encontró la id de la marca para eliminar
   */

  app.get("/eliminadosM", auth, marcasController.seeDeleted);

  /**
   * @openapi
   * /eliminadosM:
   *  get:
   *   tags:
   *    - Marcas:
   *   summary: Muestra todas las marcas eliminadas
   *   parameters:
   *      - in: header
   *        name: x-access-token
   *        schema:
   *          type: string
   *        required: true
   *   responses:
   *      200:
   *       description: Retorna un array de marcas eliminadas
   *       content:
   *          application/json:
   *              schema:
   *                  type: array
   *                  items:
   *                    example: {
   *                     "id": 1, "nombre": "Nike", "eliminado": true }
   */

  //? Lineas
  app.get("/lineas", auth, lineasController.getAllLines);

  /**
   * @openapi
   * /lineas:
   *  get:
   *   tags:
   *    - Lineas:
   *   summary: Muestra todas las lineas
   *   parameters:
   *      - in: header
   *        name: x-access-token
   *        schema:
   *          type: string
   *        required: true
   *   responses:
   *      200:
   *       description: Retorna un array de lineas
   *       content:
   *          application/json:
   *              schema:
   *                  type: array
   *                  items:
   *                    example: {
   *                     "id": 1, "nombre": "Pantalon", "eliminado": false }
   */

  app.get("/lineas/:id", auth, lineasController.getOneLine);

  /**
   * @openapi
   * /lineas/{id}:
   *  get:
   *   tags:
   *    - Lineas:
   *   summary: Muestra una linea con el ID ingresado
   *   parameters:
   *      - name: id
   *        in: path
   *        required: true
   *        description: Agregar un id
   *        schema:
   *          type: integer
   *      - name: x-access-token
   *        in: header
   *        schema:
   *          type: string
   *        description: Ingresa tu token!
   *        required: true
   *   responses:
   *      200:
   *       description: Devulve la linea con el id encontrado
   *       content:
   *          application/json:
   *              schema:
   *                  type: array
   *                  items:
   *                    example: {
   *                     "id": 2, "nombre": "Pantalones", "eliminado": false }
   *      404:
   *       description: Mensaje de error al no encontrar el producto
   *       content:
   *          application/json:
   *             schema:
   *                type: object
   *                properties:
   *                   error:
   *                      type: string
   *                      example: No se encontró la linea
   *
   */

  app.post("/lineas", auth, lineasController.createNewLine);

  /**
   * @openapi
   * /lineas:
   *  post:
   *    tags:
   *      - Lineas:
   *    summary: Añadir Lineas
   *    requestBody:
   *      required: true
   *      content:
   *          application/json:
   *           schema:
   *              type: object
   *              properties:
   *                  id:
   *                      type: number
   *                  nombre:
   *                     type: string
   *
   *
   *    parameters:
   *      - name: x-access-token
   *        in: header
   *        description: Agrega tu token
   *        required: true
   *    responses:
   *      201:
   *        description: Da un mensaje de que se añadido la linea
   *        content:
   *          text/plain:
   *            schema:
   *                type: object
   *                properties:
   *                   message:
   *                      type: string
   *                      example: Linea añadida
   *      400:
   *        description: Mensaje de error
   *        content:
   *          text/plain:
   *             schema:
   *                type: object
   *                properties:
   *                   error:
   *                      type: string
   *                      example: No se encontró la marca con el id ingresado
   */

  app.put("/lineas/:id", auth, lineasController.updateOneLine);

  /**
   * @openapi
   * /lineas/{id}:
   *  put:
   *   tags:
   *    - Lineas:
   *   summary: Editar una marca por ID
   *   requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *             type: object
   *             properties:
   *                id:
   *                   type: number
   *                nombre:
   *                   type: string
   *
   *
   *   parameters:
   *    - name: x-access-token
   *      in: header
   *      required: true
   *    - name: id
   *      in: path
   *      required: true
   *   responses:
   *    200:
   *     content:
   *       text/plain:
   *          schema:
   *                type: object
   *                properties:
   *                   message:
   *                      type: string
   *                      example: linea actualizada
   *    400:
   *      content:
   *         text/plain:
   *             schema:
   *                type: object
   *                properties:
   *                   error:
   *                      type: string
   *                      example: No se encontró la id de la linea para actualizar
   */

  app.delete("/lineas/:id", auth, lineasController.deleteOneLine);

  /**
   * @openapi
   * /lineas/{id}:
   *  delete:
   *    tags:
   *     - Lineas:
   *    summary: Eliminar una linea por ID
   *    parameters:
   *      - name: x-access-token
   *        in: header
   *        required: true
   *      - name: id
   *        in: path
   *        required: true
   *    responses:
   *      201:
   *        description: Devulve un mensaje de que se ha eliminado la linea
   *        content:
   *          text/plain:
   *             schema:
   *                type: object
   *                properties:
   *                   message:
   *                      type: string
   *                      example: Marca eliminada
   *      400:
   *       description: Mensaje de error
   *       content:
   *          text/plain:
   *             schema:
   *                type: object
   *                properties:
   *                   error:
   *                      type: string
   *                      example: No se encontró la id de la linea para eliminar
   */

  app.get("/eliminadosL", auth, lineasController.seeDeleted);

  /**
   * @openapi
   * /eliminadosL:
   *  get:
   *   tags:
   *    - Lineas:
   *   summary: Muestra todas las lineas eliminadas
   *   parameters:
   *      - in: header
   *        name: x-access-token
   *        schema:
   *          type: string
   *        required: true
   *   responses:
   *      200:
   *       description: Retorna un array de lineas eliminadas
   *       content:
   *          application/json:
   *              schema:
   *                  type: array
   *                  items:
   *                    example: {
   *                     "id": 2, "nombre": "Adidas", "eliminado": true }
   */

  //? Productos
  app.get("/productos", auth, productController.getAllProducts);

  /**
   * @openapi
   * /productos:
   *  get:
   *   tags:
   *    - Productos:
   *   summary: Muestra todas los productos
   *   parameters:
   *      - in: header
   *        name: x-access-token
   *        schema:
   *          type: string
   *        required: true
   *   responses:
   *      200:
   *       description: Retorna un array de productos
   *       content:
   *          application/json:
   *              schema:
   *                  type: array
   *                  items:
   *                    example: {
   *                       "id": 1,"producto": "Producto 1","marca": "Marca 1","linea": "Linea 1","precio": 250,"stock": 10,"eliminado": false}
   */

  app.get("/productos/:id", auth, productController.getOneProduct);

  /**
   * @openapi
   * /productos/{id}:
   *  get:
   *   tags:
   *    - Productos:
   *   summary: Muestra el producto con el ID ingresado
   *   parameters:
   *      - name: id
   *        in: path
   *        required: true
   *        description: Agregar un id
   *        schema:
   *          type: integer
   *      - name: x-access-token
   *        in: header
   *        schema:
   *          type: string
   *        description: Ingresa tu token!
   *        required: true
   *   responses:
   *      200:
   *       description: Devulve el producto con el id encontrado
   *       content:
   *          application/json:
   *              schema:
   *                  type: array
   *                  items:
   *                    example: {
   *                       "id": 1,"producto": "Producto 1","marca": "Marca 1","linea": "Linea 1","precio": 250,"stock": 10,"eliminado": false}
   *      404:
   *       description: Mensaje de error al no encontrar los productos
   *       content:
   *          application/json:
   *             schema:
   *                type: object
   *                properties:
   *                   error:
   *                      type: string
   *                      example: No se encontró el producto
   *
   */

  app.post("/productos", auth, productController.createNewProduct);

  /**
   * @openapi
   * /productos:
   *  post:
   *    tags:
   *      - Productos:
   *    summary: Añadir productos
   *    requestBody:
   *      required: true
   *      content:
   *          application/json:
   *           schema:
   *              type: object
   *              properties:
   *                  id:
   *                      type: number
   *                  producto:
   *                     type: string
   *                  marca:
   *                    type: string
   *                  linea:
   *                   type: string
   *                  precio:
   *                   type: number
   *                  stock:
   *                    type: number
   *
   *
   *
   *
   *    parameters:
   *      - name: x-access-token
   *        in: header
   *        description: Agrega tu token
   *        required: true
   *    responses:
   *      201:
   *        description: Da un mensaje de que se añadido el producto
   *        content:
   *          text/plain:
   *            schema:
   *                type: object
   *                properties:
   *                   message:
   *                      type: string
   *                      example: Producto añadido
   *      400:
   *        description: Mensaje de error
   *        content:
   *          text/plain:
   *             schema:
   *                type: object
   *                properties:
   *                   error:
   *                      type: string
   *                      example: No se encontró el producto con el id ingresado
   */

  app.put("/productos/:id", auth, productController.updateOneProduct);

  /**
   * @openapi
   * /productos/{id}:
   *  put:
   *   tags:
   *    - Productos:
   *   summary: Editar un producto por ID
   *   requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *             type: object
   *             properties:
   *                  id:
   *                      type: number
   *                  producto:
   *                     type: string
   *                  marca:
   *                    type: string
   *                  linea:
   *                   type: string
   *                  precio:
   *                   type: number
   *                  stock:
   *                    type: number
   *
   *
   *   parameters:
   *    - name: x-access-token
   *      in: header
   *      required: true
   *    - name: id
   *      in: path
   *      required: true
   *   responses:
   *    200:
   *     content:
   *       text/plain:
   *          schema:
   *                type: object
   *                properties:
   *                   message:
   *                      type: string
   *                      example: Producto actualizado
   *    400:
   *      content:
   *         text/plain:
   *             schema:
   *                type: object
   *                properties:
   *                   error:
   *                      type: string
   *                      example: No se encontró la id del producto para actualizar
   */

  app.delete("/productos/:id", auth, productController.deleteOneProduct);

  /**
   * @openapi
   * /productos/{id}:
   *  delete:
   *    tags:
   *     - Productos:
   *    summary: Eliminar un producto por ID
   *    parameters:
   *      - name: x-access-token
   *        in: header
   *        required: true
   *      - name: id
   *        in: path
   *        required: true
   *    responses:
   *      201:
   *        description: Devulve un mensaje de que se ha eliminado el producto
   *        content:
   *          text/plain:
   *             schema:
   *                type: object
   *                properties:
   *                   message:
   *                      type: string
   *                      example: Producto eliminado
   *      400:
   *       description: Mensaje de error
   *       content:
   *          text/plain:
   *             schema:
   *                type: object
   *                properties:
   *                   error:
   *                      type: string
   *                      example: No se encontró la id del producto para eliminar
   */

  app.get("/eliminadosP", auth, productController.seeDeleted);

  /**
   * @openapi
   * /eliminadosP:
   *  get:
   *   tags:
   *    - Productos:
   *   summary: Muestra todas las marcas eliminadas
   *   parameters:
   *      - in: header
   *        name: x-access-token
   *        schema:
   *          type: string
   *        required: true
   *   responses:
   *      200:
   *       description: Retorna un array de marcas eliminadas
   *       content:
   *          application/json:
   *              schema:
   *                  type: array
   *                  items:
   *                    example: {
   *                     "id": 3, "producto": "Producto3", "marca": "Marca3", "linea": "Linea3", "precio": 300, "stock": 30, "eliminado": true}
   */

  //? Ventas
  app.get("/ventas", ventasController.getAllSales);

  /**
   * @openapi
   * /ventas:
   *  get:
   *   tags:
   *    - Ventas:
   *   summary: Muestra todas las ventas
   *   parameters:
   *      - in: header
   *        name: x-access-token
   *        schema:
   *          type: string
   *        required: true
   *   responses:
   *      200:
   *       description: Retorna array de todas las ventas realizadas
   *       content:
   *          application/json:
   *              schema:
   *                  type: array
   *                  items:
   *                    example: {
   *                       "productoV": 1,"cantidadV": 5, "eliminado": false}
   *
   */

  app.post("/ventas", ventasController.createNewSale);

  /**
   * @openapi
   * /ventas:
   *  post:
   *    tags:
   *      - Ventas:
   *    summary: Realizar una nueva venta
   *    requestBody:
   *      required: true
   *      content:
   *          application/json:
   *           schema:
   *              type: object
   *              properties:
   *                  productoV:
   *                      type: number
   *                  cantidadV:
   *                     type: number
   *
   *
   *    parameters:
   *      - name: x-access-token
   *        in: header
   *        description: Agrega tu token
   *        required: true
   *    responses:
   *      201:
   *        description: Devuelve la venta y añade la venta
   *        content:
   *          text/plain:
   *            schema:
   *              type: string
   *              example: Venta añadida
   *      400:
   *        description: Mensaje de error
   *        content:
   *          text/plain:
   *             schema:
   *                type: string
   *                example: La venta no se pudo crear
   */

  //? Ingresos
  app.get("/ingresos", auth, ingresosController.getAllIncomes);

  /**
   * @openapi
   * /ingresos:
   *  get:
   *   tags:
   *    - Ingresos:
   *   summary: Muestra todos los ingresos
   *   parameters:
   *      - in: header
   *        name: x-access-token
   *        schema:
   *          type: string
   *        required: true
   *   responses:
   *      200:
   *       description: Retorna  todos los  ingresos
   *       content:
   *          application/json:
   *              schema:
   *                  type: array
   *                  items:
   *                   schema:
   *                   type: object
   *                   properties:
   *                      producto:
   *                         type: number
   *                      cantidad:
   *                         type: number
   */

  app.post("/ingresos", auth, ingresosController.createNewIncome);

  /**
   * @openapi
   * /ingresos:
   *  post:
   *    tags:
   *      - Ingresos:
   *    summary: Añaadir un nuevo ingreso
   *    requestBody:
   *      required: true
   *      content:
   *          application/json:
   *             schema:
   *              type: object
   *              properties:
   *                  producto:
   *                      type: number
   *                  cantidad:
   *                     type: number
   *
   *
   *    parameters:
   *      - name: x-access-token
   *        in: header
   *        description: Agrega tu token
   *        required: true
   *    responses:
   *      201:
   *        description: Devuelve un mensaje de ingreso
   *        content:
   *          text/plain:
   *             schema:
   *              type: string
   *              example: Ingreso creado
   *      400:
   *        description: Mensaje de error
   *        content:
   *          text/plain:
   *             schema:
   *                type: string
   *                example: No se pudo crear el ingreso
   */

  //!Error 404
  app.use(Error.Error404);
};

module.exports = UserRoutes;
