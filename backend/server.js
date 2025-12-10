require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");
// const fetch = require("node-fetch");
const axios = require("axios");

// const cors = require("cors");
// app.use(cors());
// app.use(express.json());

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

//////base URL for banana API//////
const MINIMO_API = "http://marcconrad.com/uob/";

//////Create MySQL Connection//////
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//////Connect to DB//////
db.connect((err) => {
  if (err) {
    console.log("Database Connection Failed:", err);
  } else {
    console.log("Connected to MySQL Database");
  }
});

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));



const multer = require("multer");

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });


//////Register API//////

app.post("/api/register", upload.single("avatar"), async (req, res) => {
  console.log("REQ.BODY:", req.body);
  console.log("REQ.FILE:", req.file);

  const { username, password } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "Avatar image required" });
  }

  const avatarPath = "/uploads/" + req.file.filename;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (username, password_hash, avatar) VALUES (?, ?, ?)";
    await db.execute(sql, [username, hashedPassword, avatarPath]);

    res.status(200).json({ message: "Registration successful" });
  } catch (err) {
    console.log("DB ERROR:", err);
    res.status(500).json({ error: err.message }); // show real error
  }
});

// app.post("/api/register", upload.single("avatar"), async (req, res) => {
//     console.log("register API is called!!!");
//     const { username, password } = req.body;
//     const avatar = req.file ? req.file.filename : null;

//     // await db.query(
//     //     "INSERT INTO users (username, password, avatar) VALUES (?, ?, ?)",
//     //     [username, password, avatar]
//     // );

//     await db.promise().query(
//       "INSERT INTO users (username, password_hash, avatar) VALUES (?, ?, ?)",
//        [username, password, avatar]
//     );

//     res.json({ message: "User registered", avatar });
// });


// app.post("/api/register", upload.single("avatar"), async (req, res) => {
//   console.log("REQ.BODY:", req.body);
//   console.log("REQ.FILE:", req.file);

//   const { username, password } = req.body;

//   if (!req.file) {
//     return res.status(400).json({ error: "Avatar image required" });
//   }

//   const avatarPath = "/uploads/" + req.file.filename;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const sql = "INSERT INTO users (username, password_hash, avatar) VALUES (?, ?, ?)";
//     await db.execute(sql, [username, hashedPassword, avatarPath]);

//     res.status(200).json({ message: "Registration successful" });
//   } catch (err) {
//     console.log("DB ERROR:", err);
//     res.status(500).json({ error: err.message }); // show real error
//   }
// });



// app.post("/api/register", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     db.query(
//      "INSERT INTO users (username, password_hash) VALUES (?, ?)",
//      [username, hashedPassword],

//       (err, result) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json({ message: "User registered successfully" });
//       }
//     );
//   } catch (err) {
//     return res.status(500).json({ error: "Server error" });
//   }
// });


//////Login API//////
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
    if (err || results.length === 0)
      return res.status(400).json({ error: "Invalid username" });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match)
      return res.status(400).json({ error: "Incorrect password" });

    const avatarPath = user.avatar; 

    //full accessible URL
    const profilePicUrl = avatarPath
      ? `http://localhost:3000${avatarPath}`
      : null;

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        profilePic: profilePicUrl
      }
    });
  });
});




//////Login API//////
// app.post("/api/login", (req, res) => {

//   const { username, password } = req.body;
  
//   db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
//     if (err || results.length === 0) return res.status(400).json({ error: "Invalid username" });

//     const user = results[0];
//     const match = await bcrypt.compare(password, user.password_hash);

//     if (!match) return res.status(400).json({ error: "Incorrect password" });

//     res.json({ message: "Login successful" });
//   });

// });

// app.get("/api/banana", async (req, res) => {
  
//   // const { out = 'csv' } = req.query;
//   const url = `${MINIMO_API}/banana/api.php?out=csv`;
//   // const url = `http://marcconrad.com/uob/banana/api.php?out=csv`;
  
//   const resp = await fetch(url);

//   console.log(resp.text);
// })


app.get("/api/banana", async (req, res) => {

  // console.log("api banana is running!!!!!");

    const { out = 'csv' } = req.query;
    const url = `${MINIMO_API}/banana/api.php?out=${out}`;

    // const resp = await fetch(url);
    const resp = await axios.get(url);
    const data = await resp.data;

    let image = "";
    let answer = "";

    if (out === "json") {
      image = data.question;
      answer = data.solution;
    } else {
      const [img, ans] = data.split(",");
      image = img.trim();
      answer = ans.trim();
    }

    //////Send structured response//////
    res.json({
      image,
      answer,
    });
});

app.listen(3000, () => console.log("Server listening on 3000"));

app.use(express.json());

// ///////////////////update score/////////////////
// app.post("/api/update-score", (req, res) => { 
//   const username = req.body.username; 
//   console.log("User Name:", req.body.username);

//   const sql = "UPDATE users SET score = IFNULL(score, 0) + 1 WHERE username = ?";
//   db.query(sql, [username], (err, result) => {
//     if (err) return res.status(500).send(err);
//     console.log("Rows affected:", result.affectedRows);
//     res.json({ success: true });
//   });
// });


///////////////////update score/////////////////
app.post("/api/update-score", (req, res) => { 
  const username = req.body.username; 
  console.log("User Name:", username);

  //update the score
  const updateSql = "UPDATE users SET score = IFNULL(score, 0) + 1 WHERE username = ?";
  db.query(updateSql, [username], (err, result) => {
    if (err) return res.status(500).send(err);

    console.log("Rows affected:", result.affectedRows);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    //get the updated score
    const selectSql = "SELECT score FROM users WHERE username = ?";
    db.query(selectSql, [username], (err2, rows) => {
      if (err2) return res.status(500).send(err2);

      const updatedScore = rows[0].score;
      console.log("Updated Score:", updatedScore);

      //back to frontend
      res.json({ success: true, updatedScore: updatedScore });
    });
  });
});

// Get current score for a user
app.get("/api/get-score/:username", (req, res) => {
  const username = req.params.username;

  const sql = "SELECT score FROM users WHERE username = ?";
  db.query(sql, [username], (err, rows) => {
    if (err) return res.status(500).send(err);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const score = rows[0].score || 0; // default to 0 if null
    res.json({ success: true, score });
  });
});


app.get("/api/game_images", async (req, res) =>{

  const type = req.query.type;

  if (!type) {
    return res.status(400).json({ error: "type is required" });
  }

  try {
    // RANDOM ROW QUERY
    const [rows] = await db.promise().query(
      "SELECT img, answer FROM game_items WHERE type = ? ORDER BY RAND() LIMIT 1",
      [type]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "No data found for this type" });
    }

    // Send formatted data
    res.json({
      image: rows[0].img,
      answer: rows[0].answer
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }

});

