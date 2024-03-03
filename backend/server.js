const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL database configuration
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'zitharaproject',
    password: '9328',
    port: 5432,
});

// GET /customers - Get all customers
// Add sorting logic to your existing GET /customers endpoint
app.get('/customers', async (req, res) => {
    try {
        const { search, sort } = req.query;
        let query = 'SELECT * FROM customers';

        // Add search functionality
        if (search) {
            query += ` WHERE customer_name ILIKE '%${search}%' OR location ILIKE '%${search}%'`;
        }

        // Add sorting functionality
        if (sort) {
            let sortBy = '';
            if (sort === 'name') {
                sortBy = 'customer_name ASC';
            } else if (sort === 'date') {
                sortBy = 'created_at ASC'; // Assuming 'created_at' is a timestamp column
            }
            query += ` ORDER BY ${sortBy}`;
        }

        const { rows } = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// POST /customers - Create a new customer
app.post('/customers', async (req, res) => {
    try {
        const { customer_name, age, phone, location } = req.body;
        const query = 'INSERT INTO customers (customer_name, age, phone, location) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [customer_name, age, phone, location];
        const { rows } = await pool.query(query, values);
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT /customers/:id - Update an existing customer
app.put('/customers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { customer_name, age, phone, location } = req.body;
        const query = 'UPDATE customers SET customer_name = $1, age = $2, phone = $3, location = $4 WHERE id = $5 RETURNING *';
        const values = [customer_name, age, phone, location, id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            res.status(404).json({ error: 'Customer not found' });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE /customers/:id - Delete an existing customer
app.delete('/customers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM customers WHERE id = $1', [id]);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const port = process.env.PORT || 3001; // Use port 3001 as default

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
