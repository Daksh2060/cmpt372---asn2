const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 8080;

const pool = new Pool({
    user: 'test',
    host: 'db',
    password: 'root'
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    await pool.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(255), age INT)');
    res.send('Success');
});

app.post('/users', async (req, res) => {
    const { name, age } = req.body;
    const response = await pool.query('INSERT INTO users (name, age) VALUES ($1, $2)', [name, age]);
    res.send(response);
});

app.get('/users', async (req, res) => {
    //const response = await pool.query('SELECT * FROM users')
    res.send("working");
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
});