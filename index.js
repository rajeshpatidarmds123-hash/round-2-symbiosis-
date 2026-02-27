const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors()); // 👈 Isse React se connection allow hoga
app.use(express.json()); // 👈 Isse JSON data receive hoga

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'placement_db'
});

db.connect((err) => {
    if (err) {
        console.error('SQL Connect Error: ' + err.message);
        return;
    }
    console.log('SQL Database Connected! ✅');
});

// 1. Job Post karne ke liye API (Admin ke liye)
app.post('/api/addjob', (req, res) => {
    const { company, role, package, deadline } = req.body;
    const sql = "INSERT INTO jobs (company, role, package, deadline) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [company, role, package, deadline], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ message: "Job Saved!" });
    });
});

// 2. Saari Jobs dekhne ke liye API (Dashboard ke liye) 👈 YE WALA MISSING THA
app.get('/api/getjobs', (req, res) => {
    const sql = "SELECT * FROM jobs";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(result);
    });
});

// Server Start
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend Server port ${PORT} par chalu hai! 🚀`);
});