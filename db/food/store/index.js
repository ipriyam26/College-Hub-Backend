const { pool } = require("../../config");
const uid = require("uid");
//get

const getStoreById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "SELECT * FROM food.store WHERE id = $1",
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

const createStore = (request, response) => {
  const id = uid();
  const name = request.params.name;
  const status = parseInt(request.params.status);
  const store_image = request.params.store_image;
  const cuisine = request.params.cuisine;

  pool.query(
    "INSERT INTO food.store (name, status, store_image, cuisine) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, status, store_image, cuisine],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Store with ID: ${results.rows[0].id}`);
    }
  );
};

// update

const updateStore = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, status, store_image, cuisine } = request.body;

  pool.query(
    "UPDATE food.store SET name = $1, status = $2 store_image = $3 cuisine = $4 WHERE id = $5",
    [name, ParseInt(status), store_image, cuisine, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Store with id: ${id} updated successfully`);
    }
  );
};

// delete
const deleteStore = (request, response) => {
  const id = parseInt(request.params.pool_id);

  pool.query("DELETE FROM food.store WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Food Store deleted with ID: ${id}`);
  });
};

module.exports = {
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
};
