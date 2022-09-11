const { pool } = require("../../config");
const uid = require("uid");
//get

const getOrderById = (request, response) => {
  const id = parseInt(request.params.order_id);
  pool.query(
    "SELECT * FROM food.order WHERE order_id = $1",
    [id],
    (error, results) => {
      if (error) {
        console.log(error);
      }
      response.status(200).json(results.rows);
    }
  );
};

// create

const createOrder = (request, response) => {
  const order_id = uid();
  const enrollment_no = request.params.enrollment_no;
  const store_id = request.params.store_id;
  const item_id = request.params.item_id;
  const price = parseFloat(request.params.price);
  const cook_time = parseTimeStamp(request.params.cook_time);
  const order_status = request.params.order_status;
  const posted = parseTimeStamp(request.params.posted);

  pool.query(
    "INSERT INTO food.order (order_id,enrollment_no,store_id,item_id,price,cook_time,order_status,posted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
    [
      order_id,
      enrollment_no,
      store_id,
      item_id,
      price,
      cook_time,
      order_status,
      posted,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Order with ID: ${results.rows[0].id}`);
    }
  );
};

// update

const updateOrder = (request, response) => {
  const id = request.params.order_id;
  const { item_count, t_shirt, shorts, cardigans, dress, others } =
    request.body;

  pool.query(
    "UPDATE laundry.order SET item_count = $1, t_shirt = $2, shorts=$3, cardigans=$4, dress=$5, others=$6 WHERE order_id = $7",
    [item_count, t_shirt, shorts, cardigans, dress, others, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Order with id: ${id} updated successfully`);
    }
  );
};

// delete
const deleteOrder = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "DELETE FROM food.order WHERE order_id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Food Order deleted with ID: ${id}`);
    }
  );
};

module.exports = {
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
