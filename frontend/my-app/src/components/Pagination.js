// Pagination.js
import React from 'react';

const Pagination = ({ recordsPerPage, totalRecords, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination">
            {pageNumbers.map(number => (
                <button key={number} onClick={() => paginate(number)}>
                    {number}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
