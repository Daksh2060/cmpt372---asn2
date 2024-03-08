const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const waitOn = require('wait-on');
app.use(cors());

const port = 8080;

const pool = new Pool({
    user: 'postgres',
    host: 'db',
    password: 'root'
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Initialization of both ingredient and recipe tables
async function initializeDatabase() {

    try {
        await pool.query(
            `
            CREATE TABLE IF NOT EXISTS recipes (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            steps VARCHAR(500),
            last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
            `
        );

        await pool.query(
            `
            CREATE TABLE IF NOT EXISTS ingredients (
            id SERIAL PRIMARY KEY,
            recipe_id INT REFERENCES recipes(id),
            name VARCHAR(255))
            `
        );

        console.log('Database initialized');
    } 

    catch (error){
        console.error('Error initializing database:', error);
    }
}

//Upload a new recipe and any corresponding ingredients to respective databases
app.post('/recipes', async (req, res) => {

    const { name, steps, ingredients } = req.body;
    
    try{
        const recipeResult = await pool.query('INSERT INTO recipes (name, steps) VALUES ($1, $2) RETURNING id', [name, steps]);
        const recipeId = recipeResult.rows[0].id;

        for(const ingredient of ingredients) {
            await pool.query('INSERT INTO ingredients (recipe_id, name) VALUES ($1, $2)', [recipeId, ingredient]);
        }

        res.send("Recipe created successfully");
    } 

    catch (error){
        console.error('Error creating recipe:', error);
        res.status(500).send('Error creating recipe');
    }
});

//Get all recipes to display on the homepage
app.get('/recipes', async (req, res) => {

    try{
        const response = await pool.query(
            `
            SELECT r.id, r.name, r.steps, array_agg(i.name) AS ingredients, r.last_modified AS last_modified
            FROM recipes r
            LEFT JOIN ingredients i ON r.id = i.recipe_id
            GROUP BY r.id
            `
        );

        res.json(response.rows);
    } 

    catch(error){
        console.error('Error fetching recipes:', error);
        res.status(500).send('Error fetching recipes');
    }
});

//Retrieve details about a specific recipe
app.get('/recipes/:id', async (req, res) => {

    const { id } = req.params;

    try{
        const response = await pool.query(
            `
            SELECT r.*, array_agg(i.name) AS ingredients, r.last_modified AS last_modified
            FROM recipes r
            LEFT JOIN ingredients i ON r.id = i.recipe_id
            WHERE r.id = $1
            GROUP BY r.id
            `
        , [id]);

        if (response.rows.length === 0){
            res.status(404).send('Recipe not found');
        } 

        else{
            res.json(response.rows[0]);
        }
    }
    
    catch (error){
        console.error('Error fetching recipe:', error);
        res.status(500).send('Error fetching recipe');
    }
});

//Remove a recipe and any ingredients which only it used
app.delete('/recipes/:id', async (req, res) => {

    const { id } = req.params;

    try {
        await pool.query('DELETE FROM ingredients WHERE recipe_id = $1', [id]);

        await pool.query('DELETE FROM recipes WHERE id = $1', [id]);

        res.send("Recipe deleted");
    } 
    
    catch (error){
        console.error('Error deleting recipe:', error);
        res.status(500).send('Error deleting recipe');
    }
});

//Update a recipe and the ingredients associated with it
app.put('/recipes/:id', async (req, res) => {

    const { id } = req.params;
    const { name, steps, ingredients } = req.body;

    try{
        await pool.query('UPDATE recipes SET name = $1, steps = $2, last_modified = CURRENT_TIMESTAMP WHERE id = $3', [name, steps, id]);

        await pool.query('DELETE FROM ingredients WHERE recipe_id = $1', [id]);

        for(const ingredient of ingredients){
            await pool.query('INSERT INTO ingredients (recipe_id, name) VALUES ($1, $2)', [id, ingredient]);
        }

        res.send("Recipe updated");
    } 
    
    catch (error){
        console.error('Error updating recipe:', error);
        res.status(500).send('Error updating recipe');
    }
});

//Delay the start of the server to wait for the database to start first
waitOn({ resources: ['tcp:db:5432'] }).then(() => {
 
    initializeDatabase().then(() => {
       
        app.listen(port, '0.0.0.0', () => {
            console.log(`Server running on http://0.0.0.0:${port}`);
        });
    });
});