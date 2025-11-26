
// Path:  backend/ controllers/bookController.js
const db = require('../db');

const getBooks = (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
};
module.exports = { getBooks };
