const { pool } = require("../../config/index");
const uid = require("uid");
//get

const getMaintenanceById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "SELECT * FROM maintenance.order WHERE id = $1",
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

const createMaintenance = (request, response) => {
  const id = uid();
  const problem = request.params.problem;
  const description = request.params.description;
  const quick_service = request.params.quick_service;
  const slot = request.params.slot;
  const enrollment_no = request.params.enrollment_no;
  const posted_at = request.params.posted_at;

  pool.query(
    "INSERT INTO maintenance.order (id,problem,description,quick_service,slot,enrollment_no,posted_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [id, problem, description, quick_service, slot, enrollment_no, posted_at],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`maintenance with ID: ${results.rows[0].id}`);
    }
  );
};

// update

const updateMaintenance = (request, response) => {
  const id = parseInt(request.params.id);
  const {
    problem,
    description,
    quick_service,
    slot,
    enrollment_no,
    posted_at,
  } = request.body;

  pool.query(
    "UPDATE maintenance.order SET problem=$2,description=$3,quick_service=$4,slot=$5,enrollment_no=$6,posted_at=$7 WHERE id = $1",
    [id, problem, description, quick_service, slot, enrollment_no, posted_at],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(200)
        .send(`maintenance with id: ${id} updated successfully`);
    }
  );
};

// delete
const deleteMaintenance = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "DELETE FROM car_pooling.post WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`maintenance deleted with ID: ${id}`);
    }
  );
};

module.exports = {
  getMaintenanceById,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
};
