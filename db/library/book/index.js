const { pool } = require("../../config");
const uid = require("uid");
//get

const getBookById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "SELECT * FROM library.book WHERE id = $1",
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

const createBook = (request, response) => {
  const id = uid();
  const isbn = request.params.isbn;
  const title = request.params.title;
  const edition = request.params.edition;
  const category = request.params.category;
  const price = parseInt(request.params.price);

  pool.query(
    "INSERT INTO library.book (id, isbn, title, edition, category, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [id, isbn, title, edition, category, price],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Book with ID: ${results.rows[0].id}`);
    }
  );
};

// update

const updateBook = (request, response) => {
  const id = request.params.id;
  const { isbn, title, edition, category, price } = request.body;

  pool.query(
    "UPDATE library.book SET isbn=$1, title=$2, edition=$3, category=$4, WHERE id = $5",
    [isbn, title, edition, category, price, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Book with id: ${id} updated successfully`);
    }
  );
};

// delete
const deleteBook = (request, response) => {
  const id = request.params.id;
  pool.query(
    "DELETE FROM library.book WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Book deleted with ID: ${id}`);
    }
  );
};

module.exports = {
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
