import React from 'react';

const SortOptions = ({ onSort }) => {
    return (
        <div>
            <button onClick={() => onSort('name')}>Sort by Name</button>
            <button onClick={() => onSort('date')}>Sort by Date</button>
        </div>
    );
};

export default SortOptions;
