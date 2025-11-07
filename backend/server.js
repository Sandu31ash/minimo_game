require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");

// const cors = require("cors");
// app.use(cors());
// app.use(express.json());

const app = express();
app.use(cors());
app.use(express.json());

//Create MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//Connect to DB
db.connect((err) => {
  if (err) {
    console.log("❌ Database Connection Failed:", err);
  } else {
    console.log("✅ Connected to MySQL Database");
  }
});

//Register API
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
     "INSERT INTO users (username, password_hash) VALUES (?, ?)",
     [username, hashedPassword],

      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "User registered successfully" });
      }
    );
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

//Login API
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ error: "Invalid username" });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) return res.status(400).json({ error: "Incorrect password" });

    res.json({ message: "Login successful" });
  });
});

app.listen(3000, () => console.log("✅ Server listening on 3000"));



// require('dotenv').config();
// const express = require('express');
// const helmet = require('helmet');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const mysql = require('mysql2/promise');

// const app = express();
// app.use(helmet());
// app.use(express.json());

// // CORS - allow your frontend origin (adjust in production)
// app.use(cors({ origin: true }));

// // MySQL pool
// const pool = mysql.createPool({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASS || '1234',
//   database: process.env.DB_NAME || 'minimo_db',
//   waitForConnections: true,
//   connectionLimit: 10,
// });

// // Helpers
// function signToken(payload) {
//   return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '2h' });
// }

// async function findUserByUsername(username) {
//   const [rows] = await pool.query('SELECT id, username, email, password_hash FROM users WHERE username = ?', [username]);
//   return rows[0] || null;
// }

// // Register (optional)
// app.post('/api/register', async (req, res) => {
//   try {
//     const { username, password, email } = req.body;
//     if (!username || !password) return res.status(400).json({ error: 'Missing fields' });

//     // check exists
//     const existing = await findUserByUsername(username);
//     if (existing) return res.status(409).json({ error: 'Username already exists' });

//     const hash = await bcrypt.hash(password, 10);
//     await pool.query('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)', [username, email || null, hash]);

//     return res.json({ success: true, message: 'Registered' });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'Server error' });
//   }
// });

// // Login
// app.post('/api/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     if (!username || !password) return res.status(400).json({ error: 'Missing fields' });

//     const user = await findUserByUsername(username);
//     if (!user) return res.status(401).json({ error: 'Invalid credentials' });

//     const ok = await bcrypt.compare(password, user.password_hash);
//     if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

//     const token = signToken({ id: user.id, username: user.username });
//     return res.json({ success: true, token, username: user.username });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'Server error' });
//   }
// });

// // Example protected route
// app.get('/api/profile', async (req, res) => {
//   try {
//     const auth = req.headers.authorization;
//     if (!auth) return res.status(401).json({ error: 'Missing authorization header' });

//     const token = auth.split(' ')[1];
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     const [rows] = await pool.query('SELECT id, username, email, created_at FROM users WHERE id = ?', [payload.id]);
//     if (!rows.length) return res.status(404).json({ error: 'User not found' });
//     return res.json({ success: true, user: rows[0] });
//   } catch (err) {
//     console.error(err);
//     return res.status(401).json({ error: 'Invalid or expired token' });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server listening on ${PORT}`));





// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const db = require("./database");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Login API
// app.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
//   db.query(sql, [username, password], (err, result) => {
//     if (err) return res.json({ error: err });
//     if (result.length > 0) {
//       return res.json({ success: true, message: "Login successful" });
//     } else {
//       return res.json({ success: false, message: "Invalid login" });
//     }
//   });
// });

// app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
