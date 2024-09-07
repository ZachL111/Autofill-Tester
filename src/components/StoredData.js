import React, { useEffect, useState } from 'react';

function StoredData() {
  const [storedData, setStoredData] = useState(null);

  useEffect(() => {
    const checkStoredData = () => {
      const data = localStorage.getItem('formData');
      if (data) {
        setStoredData(JSON.parse(data));
      }
    };

    // Check on mount
    checkStoredData();

    // Set up an interval to check periodically
    const intervalId = setInterval(checkStoredData, 1000);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  if (!storedData) return <p>No stored data yet.</p>;

  return (
    <div>
      <h2>Last Submitted Data:</h2>
      <p>Username: {storedData.username}</p>
      <p>Password: {storedData.password}</p>
      <p>Zipcode: {storedData.zipcode}</p>
    </div>
  );
}

export default StoredData;