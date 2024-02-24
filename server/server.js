const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 8080;

const pool = new Pool({
    user: 'postgres',
    host: 'db',
    password: 'root'
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    await pool.query('CREATE TABLE IF NOT EXISTS recipes (id SERIAL PRIMARY KEY, name VARCHAR(255), ingredients VARCHAR(500), steps VARCHAR(500))');
    res.send('Success');
});

app.post('/recipes', async (req, res) => {
    const { name, ingredients, steps } = req.body;
    const response = await pool.query('INSERT INTO recipes (name, ingredientsm steps) VALUES ($1, $2, $3)', [name, ingredients, steps]);
    res.send("sent");
});

app.get('/recipes', async (req, res) => {
    const response = await pool.query('SELECT * FROM recipes')
    res.send(response.rows);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
});