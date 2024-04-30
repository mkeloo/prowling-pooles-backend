// import express from 'express';
// import mysql from 'mysql';
// import cors from 'cors';
// import jwt from 'jsonwebtoken';
// import bcrypt, { hash } from 'bcrypt';
// import cookieParser from 'cookie-parser';

// const salt = 10;

// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use(cookieParser());

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

// app.post('/register', (req, res) => {
//   const sql = 'INSERT INTO users (`username`, `password`, `email`) VALUES (?)';
//   bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
//     if (err) return res.json({ Error: 'Error for hashing password' });
//     const values = [req.body.username, req.body.password, req.body.password];
//   });
//   db.query(sql, [values], (err, result) => {
//     if (err) return res.json({ Error: 'Inserting data Error in server' });
//     return res.json({ Status: 'Success' });
//   });
// });

// app.listen(8081, () => {
//   console.log('DB Running...');
// });
