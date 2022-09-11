const { pool } = require("../../config");
const uid = require("uid");
//get

const getHostleById = (request, response) => {
  const id = request.params.id;
  pool.query(
    'SELECT * FROM public."Hostle" WHERE enrollment_no = $1',
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

const createHostle = (request, response) => {
  const id = request.params.id;
  const block = request.params.block;
  const floor = parseInt(request.params.floor);
  const room_no = parseInt(request.params.room_no);
  const roommate = request.params.room_mate;
  const room = request.params.room;

  pool.query(
    'INSERT INTO public."Hostle" (enrollment_no, block, floor, room_no, roommate, room) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [id, block, floor, room_no, room_mate, room],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Hostle with ID: ${results.rows[0].id}`);
    }
  );
};

// update

const updateHostle = (request, response) => {
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
const deleteHostle = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    'DELETE FROM public."Hostle" WHERE enrollment_no = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Hostle deleted with ID: ${id}`);
    }
  );
};

module.exports = {
  getHostleById,
  createHostle,
  updateHostle,
  deleteHostle,
};
