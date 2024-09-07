import React, { useState } from 'react';
import AutofillForm from './components/AutofillForm';
import StoredData from './components/StoredData';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFormSubmit = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div className="App">
      <h1>Autofill Test</h1>
      <AutofillForm onSubmit={handleFormSubmit} />
      <StoredData key={refreshKey} />
    </div>
  );
}

export default App;
