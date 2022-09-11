const { pool } = require("../../config");
const uid = require("uid");
//get

const getOrderById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "SELECT * FROM laundry.order WHERE order_id = $1",
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
  const id = uid();
  const item_count = request.params.item_count;
  const t_shirt = request.params.t_shirt;
  const shorts = parseInt(request.params.shorts);
  const cardigans = parseTimeStamp(request.params.cardigans);
  const dress = parseInt(request.params.dress);
  const others = parseInt(request.params.others);

  pool.query(
    "INSERT INTO laundry.order (id, item_count, t_shirt, shorts, cardigans, dress, others) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [id, item_count, t_shirt, shorts, cardigans, dress, others],
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
  const id = request.params.id;
  pool.query(
    "DELETE FROM laundry.order WHERE order_id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Order deleted with ID: ${id}`);
    }
  );
};

module.exports = {
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
