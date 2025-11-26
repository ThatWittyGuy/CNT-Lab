
// Path:  backend/routes/books.js
const express = require('express');
const router = express.Router();
const db = require('../db'); 
const { getBooks } = require('../controllers/bookController');

router.get('/', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) return res.status(500).send({ error: 'Database error' });
    res.send(results);
  });
});
module.exports = router;
