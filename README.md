# zithara
Assessment:


Building a React and Node.js application with a PostgreSQL database as described requires multiple steps 
-> Setting up the backend server
-> Creating the database schema
-> Populating the database with dummy data
-> Building the frontend application with React
-> Implementing pagination, search functionality, and sorting options.

Instructions:


Backend (Node.js with Express):
Setup PostgreSQL Database:

Install PostgreSQL and set up a new database.
Create a table named customers with columns sno, customer_name, age, phone, location, and created_at.
Populate Database with Dummy Data:

Writing a script to generate 50 records with dummy data and insert them into the customers table.

Build API Endpoints:

Create endpoints to fetch paginated data from the customers table.
Implement search functionality to filter data by customer_name or location.
Add an endpoint to sort data by created_at (date or time).

Expose APIs with Express:

Use Express to create API routes for fetching data, searching, and sorting.


Frontend (React):

Setup React Application:

Initialize a new React application using Create React App or any other method.
Create Components.

Build components for displaying the table, pagination, search bar, and sorting options.
Fetch Data from Backend

Use fetch or Axios to make HTTP requests to the backend API endpoints created earlier.
Display Data in Table Format

Allow users to input search queries and filter data based on the customer_name or location columns.

