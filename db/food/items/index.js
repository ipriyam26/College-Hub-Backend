const { pool } = require("../../config");
const uid = require("uid");
//get

const getItemById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "SELECT * FROM food.items WHERE item_id = $1",
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

const createItem = (request, response) => {
  const id = uid();
  const store_id = request.params.store_id;
  const name = request.params.name;
  const price = parseInt(request.params.price);
  const image = request.params.image;
  const type = request.params.type;

  pool.query(
    "INSERT INTO food.items (id,store_id,name,price,image,type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [id, store_id, name, price, image, type],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Item with ID: ${results.rows[0].id}`);
    }
  );
};

// update

// delete
const deleteItem = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM food.items WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Food Item deleted with ID: ${id}`);
  });
};

module.exports = {
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
