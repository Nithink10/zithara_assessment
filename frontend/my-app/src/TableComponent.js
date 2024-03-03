import React, { useState, useEffect } from 'react';

const TableComponent = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const pageSize = 20;

  // Function to filter data based on search term
  const filteredData = data.filter(
    item =>
      item.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to sort data based on sortBy and sortOrder
  const sortedData = sortBy
    ? [...filteredData].sort((a, b) => {
        const keyA = a[sortBy].toLowerCase();
        const keyB = b[sortBy].toLowerCase();
        if (sortOrder === 'asc') {
          return keyA.localeCompare(keyB);
        } else {
          return keyB.localeCompare(keyA);
        }
      })
    : filteredData;

  // Function to paginate data
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Function to handle page change
  const handlePageChange = page => {
    setCurrentPage(page);
  };

  // Function to handle search term change
  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  // Function to handle sort change
  const handleSortChange = column => {
    setSortBy(column);
    setSortOrder(sortBy === column && sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or location"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSortChange('customer_name')}>
              Customer Name
            </th>
            <th onClick={() => handleSortChange('age')}>Age</th>
            <th onClick={() => handleSortChange('phone')}>Phone</th>
            <th onClick={() => handleSortChange('location')}>Location</th>
            <th onClick={() => handleSortChange('created_at')}>Date</th>
            <th onClick={() => handleSortChange('created_at')}>Time</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map(item => (
            <tr key={item.sno}>
              <td>{item.customer_name}</td>
              <td>{item.age}</td>
              <td>{item.phone}</td>
              <td>{item.location}</td>
              <td>{new Date(item.created_at).toLocaleDateString()}</td>
              <td>{new Date(item.created_at).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from({ length: Math.ceil(sortedData.length / pageSize) }).map(
          (_, index) => (
            <button key={index} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default TableComponent;
