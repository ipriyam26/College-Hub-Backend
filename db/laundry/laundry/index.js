const { pool } = require("../../config");
const uid = require("uid");
//get

const getLaundryById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "SELECT * FROM laundry.laundry WHERE order_id = $1",
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

const createLaundry = (request, response) => {
  const id = uid();
  const bag_id = request.params.bag_id;
  const enrollment_no = request.params.enrollment_no;
  const given_on = parseTimeStamp(request.params.given_on);
  const taken_on = parseTimeStamp(request.params.taken_on);
  const status = parseInt(request.params.status);

  pool.query(
    "INSERT INTO laundry.laundry (id, bag_id,enrollment_no,given_on,taken_on,status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [id, bag_id, enrollment_no, given_on, taken_on, status],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Laundry with ID: ${results.rows[0].id}`);
    }
  );
};

// update

const updateLaundry = (request, response) => {
  const id = request.params.pool_id;
  const { bag_id, status } = request.body;

  pool.query(
    "UPDATE laundry.laundry SET bag_id = $1, status = $2 WHERE id = $3",
    [bag_id, status, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Laundry with id: ${id} updated successfully`);
    }
  );
};

// delete
const deleteLaundry = (request, response) => {
  const id = request.params.id;
  pool.query(
    "DELETE FROM laundry.laundry WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Laundry deleted with ID: ${id}`);
    }
  );
};

module.exports = {
  getLaundryById,
  createLaundry,
  updateLaundry,
  deleteLaundry,
};
