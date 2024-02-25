const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
app.use(cors());

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
    const response = await pool.query('INSERT INTO recipes (name, ingredients, steps) VALUES ($1, $2, $3)', [name, ingredients, steps]);
    res.send("sent");
});

app.get('/recipes', async (req, res) => {
    const response = await pool.query('SELECT * FROM recipes')
    res.send(response.rows);
});

app.get('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await pool.query('SELECT * FROM recipes WHERE id = $1', [id]);
        if (response.rows.length === 0) {
            res.status(404).send('Recipe not found');
        } else {
            res.json(response.rows[0]);
        }
    } catch (error) {
        console.error('Error fetching recipe:', error);
        res.status(500).send('Error fetching recipe');
    }
});

app.delete('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM recipes WHERE id = $1', [id]);
    res.send("Recipe deleted");
});

app.put('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, steps } = req.body;
    await pool.query('UPDATE recipes SET name = $1, ingredients = $2, steps = $3 WHERE id = $4', [name, ingredients, steps, id]);
    res.send("Recipe updated");
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
});