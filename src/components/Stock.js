import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Papa from 'papaparse';
import Fuse from 'fuse.js';

const InstrumentsAPI = 'https://prototype.sbulltech.com/api/v2/instruments';

const StocksPage = () => {
  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState('');
  const [searchRes, setSearchRes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(InstrumentsAPI);
        const csvData = response.data;

        Papa.parse(csvData, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            setStocks(result.data);
            setSearchRes(result.data);
          },
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (search.trim() === '') {
      setSearchRes(stocks);
      return;
    }

    const choice = {
      keys: ['Symbol', 'Name', 'Sector', 'Validtill'],
      threshold: 0.5,
      match: 'any',
    };

    const fuse = new Fuse(stocks, choice);
    const results = fuse.search(search);
    setSearchRes(results.map((result) => result.item));
  }, [search, stocks]);

  return (
    <div>
      <h1>Stocks Page</h1>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Sector</th>
            <th>Validtill</th>
          </tr>
        </thead>
        <tbody>
          {searchRes.map((stock) => (
            <tr key={stock.Symbol}>
              <td>
                <Link to={`/quotes/${stock.Symbol}`}>{stock.Symbol}</Link>
              </td>
              <td>{stock.Name}</td>
              <td>{stock.Sector}</td>
              <td>{stock.Validtill}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StocksPage;
