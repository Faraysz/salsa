const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test_db'
});

db.connect((err) => {
  if (err) {
    console.error('DB Error:', err);
    return;
  }
  console.log('✅ MySQL Connected');
});

module.exports = db;