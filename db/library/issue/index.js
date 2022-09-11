const { pool } = require("../../config");
const uid = require("uid");
//get

const getIssueById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "SELECT * FROM library.issue WHERE id = $1",
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

const createIssue = (request, response) => {
    const id = uid();
    const enrollment_no = request.params.enrollment_no;
  const book_id = request.params.book_id;
    const issue_date = parseTimeStamp(request.params.issue_date);
    const return_date = parseTimeStamp(request.params.return_date);

  pool.query(
    "INSERT INTO library.issue (id,enrollment_no,book_id,issue_date,return_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [id, enrollment_no, book_id, issue_date, return_date],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Issue with ID: ${results.rows[0].id}`);
    }
  );
};

// update

const updateIssue = (request, response) => {
  const id = request.params.id;
  const { isbn, title, edition, category, price } = request.body;

  pool.query(
    "UPDATE library.issue SET isbn=$1, title=$2, edition=$3, category=$4, WHERE id = $5",
    [isbn, title, edition, category, price, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Issue with id: ${id} updated successfully`);
    }
  );
};

// delete
const deleteIssue = (request, response) => {
  const id = request.params.id;
  pool.query(
    "DELETE FROM library.issue WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Issue deleted with ID: ${id}`);
    }
  );
};

module.exports = {
  getIssueById,
  createIssue,
  updateIssue,
  deleteIssue,
};
