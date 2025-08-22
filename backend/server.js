import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || "mysql",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "homemade_food"
});

db.connect(err => {
  if (err) console.log("DB Connection Error:", err);
  else console.log("DB Connected!");
});

// API: Get all foods
app.get("/api/foods", (req, res) => {
  db.query("SELECT * FROM foods", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// API: Add food (simple POST example)
app.post("/api/foods", (req, res) => {
  const { name, price } = req.body;
  db.query("INSERT INTO foods (name, price) VALUES (?, ?)", [name, price], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Food added!", id: result.insertId });
  });
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
