import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuotesAPI = 'https://prototype.sbulltech.com/api/v2/quotes';

const Quote = () => {
  const { symbol } = useParams();
  const [quotes, setQuotes] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${QuotesAPI}/${symbol}`);
        const { success, payload } = response.data;

        if (success) {
          const sortedQuotes = (payload[symbol] || []).sort((a, b) => new Date(a.time) - new Date(b.time));
          setQuotes(sortedQuotes);
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
      }, 10000);

      return () => {
        clearInterval(intervalId);
      };
    };

    fetchReload();
  }, [symbol]);

  return (
    <div>
      <h2>Quote Page for {symbol}</h2>
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

export default Quote;