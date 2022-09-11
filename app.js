require("dotenv").config();

const express = require("express");
const errorHandler = require("errorhandler");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const logger = require("morgan");

const { pool } = require("./db/config/index");
const carPool = require("./db/car_pooling");
const food = require("./db/food");
const public = require("./db/public");
const laundry = require("./db/laundry");
const library = require("./db/library");
const maintenance = require("./db/maintenance");

const app = express();
const port = 3000 || process.env.PORT;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(errorHandler());

// app.use((req, res, next) => {

// });

app.get("/", (req, res) => {
  res.status(200).json("hey");
});

app.get("/db", (req, res) => {
  pool.query('SELECT * FROM public."User"', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// Car pooling routes

app.get("/car_pooling/:id", carPool.getCarPoolById);
app.post("/car_pooling", carPool.createCarPool);
app.put("/car_pooling/:id", carPool.updateCarPool);
app.delete("/car_pooling/:id", carPool.deleteCarPool);

// food routes
// food.items
app.get("/food/items/:id", food.items.getItemById);
app.post("/food/items", food.items.createItem);
app.put("/food/items/:id", food.items.updateItem);
app.delete("/food/items/:id", food.items.deleteItem);

//food.order

app.get("/food/order/:id", food.order.getOrderById);
app.post("/food/order", food.order.createOrder);
app.put("/food/order/:id", food.order.updateOrder);
app.delete("/food/order/:id", food.order.deleteOrder);

// food.store
app.get("/food/store/:id", food.store.getStoreById);
app.post("/food/store", food.store.createStore);
app.put("/food/store/:id", food.store.updateStore);
app.delete("/food/store/:id", food.store.deleteStore);

// app.get("/*/:uid", async (req, res) => {});

// public.Hostle
app.get("/public/hostle/:id", public.hostle.getHostleById);
app.post("/public/hostle", public.hostle.createHostle);
app.put("/public/hostle/:id", public.hostle.updateHostle);
app.delete("/public/hostle/:id", public.hostle.deleteHostle);

// public.User
app.get("/public/user/:id", public.user.getUserById);
app.post("/public/user", public.user.createUser);
app.put("/public/user/:id", public.user.updateUser);
app.delete("/public/user/:id", public.user.deleteUser);

// laundry laundry
app.get("/laundry/laundry/:id", laundry.laundry.getLaundryById);
app.post("/laundry/laundry", laundry.laundry.createLaundry);
app.put("/laundry/laundry/:id", laundry.laundry.updateLaundry);
app.delete("/laundry/laundry/:id", laundry.laundry.deleteLaundry);

// laundry order
app.get("/laundry/order/:id", laundry.order.getOrderById);
app.post("/laundry/order", laundry.order.createOrder);
app.put("/laundry/order/:id", laundry.order.updateOrder);
app.delete("/laundry/order/:id", laundry.order.deleteOrder);

// library book

app.get("/laundry/library/book/:id", library.book.getBookById);
app.post("/laundry/library/book", library.book.createBook);
app.put("/laundry/library/book/:id", library.book.updateBook);
app.delete("/laundry/library/book/:id", library.book.deleteBook);

// library issue

app.get("/laundry/library/issue/:id", library.issue.getIssueById);
app.post("/laundry/library/issue", library.issue.createIssue);
app.put("/laundry/library/issue/:id", library.issue.updateIssue);
app.delete("/laundry/library/issue/:id", library.issue.deleteIssue);

// maintenance order

app.get("/maintenance/order/:id", maintenance.order.getMaintenanceById);
app.post("/maintenance/order/", maintenance.order.createMaintenance);
app.put("/maintenance/order/:id", maintenance.order.updateMaintenance);
app.delete("/maintenance/:id", maintenance.order.deleteMaintenance);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
