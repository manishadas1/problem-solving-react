import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

const InstrumentsAPI = 'https://prototype.sbulltech.com/api/v2/instruments';

const StocksPage = () => {
    const [stocks, setStocks] = useState([]);

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
                    },
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Stocks Page</h1>
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
                    {stocks.map((stock) => (
                        <tr key={stock.Symbol}>
                            <td>{stock.Symbol}</td>
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
