import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerTable from './CustomerTable';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        fetchData();
    }, [page, searchQuery, sortBy, sortOrder]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/customers?page=${page}&searchQuery=${searchQuery}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSort = (columnName) => {
        if (sortBy === columnName) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(columnName);
            setSortOrder('asc');
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div>
            <h2>Customer List</h2>
            <input type="text" placeholder="Search by name or location" value={searchQuery} onChange={handleSearch} />
            <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
            <button onClick={() => handlePageChange(page + 1)}>Next</button>
            <button onClick={() => handleSort('customer_name')}>Sort by Name</button>
            <button onClick={() => handleSort('created_at')}>Sort by Date</button>
            <CustomerTable customers={customers} />
        </div>
    );
};

export default CustomerList;
