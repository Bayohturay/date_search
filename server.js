const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3001;

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  next();
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Bayoh123',
  database: 'your_database',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

app.get('/api/query', (req, res) => {
  const { startDate, endDate } = req.query;

  const sql = `SELECT * FROM your_table WHERE date_column BETWEEN '${startDate}' AND '${endDate}'`;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).json({ error: 'Failed to execute query' });
      return;
    }

    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
