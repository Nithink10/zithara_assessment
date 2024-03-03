import React, { useState } from 'react';

const SearchSort = ({ onSearch, onSort }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('');

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    const handleSort = (e) => {
        const selectedSort = e.target.value;
        setSortBy(selectedSort);
        onSort(selectedSort);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search by name or location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <select onChange={handleSort} value={sortBy}>
                <option value="">Sort by</option>
                <option value="date">Date</option>
                <option value="time">Time</option>
            </select>
        </div>
    );
};

export default SearchSort;
