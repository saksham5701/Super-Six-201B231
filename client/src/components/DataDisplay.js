import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/data?page=${currentPage}`);
      setData(res.data.data);
      setTotalPages(res.data.totalPages);
    };
    fetchData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Credit Score</th>
            <th>Credit Lines</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.CreditScore}</td>
              <td>{item.CreditLines}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {[...Array(totalPages).keys()].map((num) => (
          <button key={num} onClick={() => handlePageChange(num + 1)}>
            {num + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DataDisplay;