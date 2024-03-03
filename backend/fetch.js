// const express = require('express');
// const { Pool } = require('pg');

// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'zitharaproject',
//     password: '9328',
//     port: 5432,
// });

// const app = express();
// app.use(express.json());

// // GET /customers - Retrieve all customers with pagination, search, and sorting
// app.get('/customers', async (req, res) => {
//     try {
//         // Pagination, search, and sorting parameters
//         const { page = 1, pageSize = 10, searchTerm = '', sortBy = 'sno', sortOrder = 'ASC' } = req.query;
//         const offset = (page - 1) * pageSize;

//         // Construct SQL query
//         let query = 'SELECT * FROM customers';
//         const params = [];
//         if (searchTerm) {
//             query += ' WHERE customer_name ILIKE $1';
//             params.push(`%${searchTerm}%`);
//         }
//         query += ` ORDER BY ${sortBy} ${sortOrder}`;
//         query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;

//         params.push(pageSize, offset);

//         const result = await pool.query(query, params);
//         res.json(result.rows);
//     } catch (error) {
//         console.error('Error retrieving customers:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // POST /customers - Create a new customer
// app.post('/customers', async (req, res) => {
//     try {
//         const { customer_name, age, phone, location } = req.body;
//         const created_at = new Date().toISOString();

//         const result = await pool.query('INSERT INTO customers (customer_name, age, phone, location, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *', [customer_name, age, phone, location, created_at]);
//         res.status(201).json(result.rows[0]);
//     } catch (error) {
//         console.error('Error creating customer:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // PUT /customers/:id - Update an existing customer
// app.put('/customers/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { customer_name, age, phone, location } = req.body;

//         const result = await pool.query('UPDATE customers SET customer_name = $1, age = $2, phone = $3, location = $4 WHERE sno = $5 RETURNING *', [customer_name, age, phone, location, id]);
//         if (result.rowCount === 0) {
//             return res.status(404).json({ error: 'Customer not found' });
//         }
//         res.json(result.rows[0]);
//     } catch (error) {
//         console.error('Error updating customer:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // DELETE /customers/:id - Delete a customer
// app.delete('/customers/:id', async (req, res) => {
//     try {
//         const { id } = req.params;

//         const result = await pool.query('DELETE FROM customers WHERE sno = $1 RETURNING *', [id]);
//         if (result.rowCount === 0) {
//             return res.status(404).json({ error: 'Customer not found' });
//         }
//         res.json({ message: 'Customer deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting customer:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
