// components/CustomerTable.js
import React, { useState } from 'react';
import Pagination from './Pagination'; 
const CustomerTable = ({ customers }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 20;

    // Calculate index of the first and last records on the current page
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = customers.slice(indexOfFirstRecord, indexOfLastRecord);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="customer-table">
            <table>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Age</th>
                        <th>Phone</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map(customer => (
                        <tr key={customer.sno}>
                            <td>{customer.customer_name}</td>
                            <td>{customer.age}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.location}</td>
                            <td>{customer.created_at.split('T')[0]}</td>
                            <td>{customer.created_at.split('T')[1].split('.')[0]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                recordsPerPage={recordsPerPage}
                totalRecords={customers.length}
                paginate={paginate}
            />
        </div>
    );
};

export default CustomerTable;
