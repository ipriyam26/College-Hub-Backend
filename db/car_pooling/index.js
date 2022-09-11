const { pool } = require("../config/index");
const uid = require("uid");
//get

const getCarPoolById = (request, response) => {
  const pool_id = parseInt(request.params.pool_id);
  pool.query(
    "SELECT * FROM car_pooling.post WHERE pool_id = $1",
    [pool_id],
    (error, results) => {
      if (error) {
        console.log(error);
      }
      response.status(200).json(results.rows);
    }
  );
};

// create

const createCarPool = (request, response) => {
  const pool_id = uid();
  const description = request.params.description;
  const enrollment_no = request.params.enrollment_no;
  const departure = parseTimeStamp(request.params.departure);
  const contact_no = parseInt(request.params.contact_no);
  const destination = request.params.destination;
  const max_people = parseInt(request.params.max_people);
  const curr_people = parseInt(request.params.curr_people);
  const vehicle = request.params.vehicle;
  const male_count = request.params.male_count;
  const female_count = request.params.female_count;
  const cost = request.params.cost ? parseInt(request.params.cost) : 0;

  pool.query(
    "INSERT INTO car_pooling.post (pool_id,description,enrollment_no,departure,contact_no,destination,max_people,curr_people,vehicle,male,female,cost) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
    [
      pool_id,
      description,
      enrollment_no,
      departure,
      contact_no,
      destination,
      max_people,
      curr_people,
      vehicle,
      male_count,
      female_count,
      cost,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Pool with ID: ${results.rows[0].id}`);
    }
  );
};

// update

const updateCarPool = (request, response) => {
  const id = parseInt(request.params.pool_id);
  const { curr_people, destination, departure } = request.body;

  pool.query(
    "UPDATE car_pooling.post SET curr_people = $1, destination = $2 departure = $3 WHERE id = $4",
    [parseInt(curr_people), destination, parseTimeStamp(departure), id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Car pool with id: ${id} updated successfully`);
    }
  );
};

// delete
const deleteCarPool = (request, response) => {
  const id = parseInt(request.params.pool_id);

  pool.query(
    "DELETE FROM car_pooling.post WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Car Pool deleted with ID: ${id}`);
    }
  );
};

module.exports = {
  getCarPoolById,
  createCarPool,
  updateCarPool,
  deleteCarPool,
};
