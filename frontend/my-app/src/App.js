import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerTable from './components/CustomerTable';
import SearchBar from './components/SearchBar';
import SortOptions from './components/SortOptions';
import './styles.css'; // Import the CSS file for styling

const App = () => {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('');

    useEffect(() => {
        fetchData();
    }, [searchTerm, sortBy]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/customers?search=${searchTerm}&sort=${sortBy}`);
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    const handleSort = (sortBy) => {
        setSortBy(sortBy);
    };

    return (
        <div className="container"> {/* Wrap content in a container div */}
            <h1>Zithara Project </h1>
            <SearchBar onSearch={handleSearch} />
            <SortOptions onSort={handleSort} />
            <CustomerTable customers={customers} />
        </div>
    );
};

export default App;
