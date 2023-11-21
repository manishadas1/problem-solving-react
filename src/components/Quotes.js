import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuotesAPI = 'https://prototype.sbulltech.com/api/v2/quotes';

const QuotePage = () => {
  const { symbol } = useParams();
  const [quotes, setQuotes] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${QuotesAPI}/${symbol}`);
        const { success, payload } = response.data;

        if (success) {
          setQuotes(payload[symbol] || []);
        } else {
          console.error('Error fetching quotes:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoad(false);
      }
    };

    const fetchReload = async () => {
      await fetchData();

      const intervalId = setInterval(() => {
        window.location.reload();
      }, 20000);
    }; 
  }, [symbol]);

  return (
    <div>
      <h3>Quote Page for {symbol}</h3>
      {load ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Price</th>
              <th>Valid Till</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote, index) => (
              <tr key={index}>
                <td>{quote.time}</td>
                <td>{quote.price}</td>
                <td>{quote.valid_till}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default QuotePage;