const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/register', (req, res) => {
  const { fullName, email, password } = req.body;

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.query(sql, [fullName, email, password], (err, result) => {
    if (err) {
      console.log("MYSQL ERROR:", err);
      return res.status(500).json({ message: 'Register gagal' });
    }

    res.json({ message: 'Register berhasil' });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    if (results.length > 0) {
      res.json({ message: 'Login berhasil', user: results[0] });
    } else {
      res.status(401).json({ message: 'Email / Password salah' });
    }
  });
});

app.listen(3001, () => {
  console.log('🚀 Server jalan di http://localhost:3001');
});