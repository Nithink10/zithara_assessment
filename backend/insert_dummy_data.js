// insert_dummy_data.js

const { Pool } = require('pg');

// PostgreSQL database configuration
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'zitharaproject',
    password: '9328',
    port: 5432,
});

// Function to generate dummy data
function generateDummyData() {
    const dummyData = [];
    for (let i = 1; i <= 50; i++) {
        const customer = {
            customer_name: `Member ${i}`,
            age: Math.floor(Math.random() * 50) + 20, // Random age between 20 and 70
            phone: `123-456-${i.toString().padStart(2, '0')}`, // Format: 123-456-01, 123-456-02, ...
            location: `Location ${i}`,
            created_at: new Date().toISOString(), // Current timestamp
        };
        dummyData.push(customer);
    }
    return dummyData;
}

// Insert dummy data into the database
async function insertDummyData() {
    try {
        // Connect to the database
        const client = await pool.connect();

        // Generate dummy data
        const data = generateDummyData();

        // TRUNCATE the customers table to remove all data and reset sequence
await client.query('TRUNCATE customers RESTART IDENTITY');

// Insert data into the customers table
await Promise.all(data.map(async (customer) => {
    await client.query('INSERT INTO customers (customer_name, age, phone, location, created_at) VALUES ($1, $2, $3, $4, $5)', [
        customer.customer_name,
        customer.age,
        customer.phone,
        customer.location,
        customer.created_at
    ]);
}));

        // Release the client back to the pool
        client.release();

        console.log('Dummy data inserted successfully.');
    } catch (error) {
        console.error('Error inserting dummy data:', error);
    }
}

// Call the insertDummyData function
insertDummyData();
