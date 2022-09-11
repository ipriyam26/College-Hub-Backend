const { pool } = require("../../config");
const uid = require("uid");
//get

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    'SELECT * FROM public."User" WHERE enrollment_no = $1',
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

const createUser = (request, response) => {
  const id = uid();
  const enrollment_no = request.params.enrollment_no;
  const first_name = request.params.first_name;
  const second_name = request.params.second_name;
  const age = parseInt(request.params.age);
  const gender = request.params.gender;
  const hostler = request.params.hostler;
  const password = request.params.email;

  pool.query(
    'INSERT INTO public."User" (id,enrollment_no,first_name,second_name,age,gender,hostler,password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [
      id,
      enrollment_no,
      first_name,
      second_name,
      age,
      gender,
      hostler,
      password,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User with ID: ${results.rows[0].id}`);
    }
  );
};

// update

const updateUser = (request, response) => {
  const id = request.params.pool_id;
  const { bag_id, status } = request.body;

  pool.query(
    'UPDATE public."User" SET bag_id = $1, status = $2 WHERE enrollment_no = $3',
    [bag_id, status, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User with id: ${id} updated successfully`);
    }
  );
};

// delete
const deleteUser = (request, response) => {
  const id = request.params.id;
  pool.query(
    'DELETE FROM public."User" WHERE enrollment_no = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${id}`);
    }
  );
};

module.exports = {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
