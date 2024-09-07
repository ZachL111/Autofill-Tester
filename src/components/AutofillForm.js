import React, { useEffect, useState } from 'react';

function AutofillForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    zipcode: ''
  });

  useEffect(() => {
    // Attempt to trigger autofill on component mount
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    if (usernameInput && passwordInput) {
      usernameInput.focus();
      passwordInput.focus();
      usernameInput.focus();
    }
  }, []);

  const handleChange = (e) => {
    setFormData(prevData => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    try {
      const response = await fetch('http://localhost:3001/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Form data saved!');
        onSubmit(); // Notify parent component
      } else {
        alert('Error saving data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving data');
    }
  };

  const invisibleInputStyle = {
    position: 'absolute',
    opacity: 0,
    height: 0,
    width: 0,
    zIndex: -1,
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input 
          type="text" 
          id="username" 
          name="username" 
          autoComplete="username" 
          required 
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          autoComplete="current-password" 
          required 
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <input 
        type="text" 
        id="zipcode" 
        name="zipcode" 
        autoComplete="postal-code" 
        value={formData.zipcode}
        onChange={handleChange}
        style={invisibleInputStyle}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default AutofillForm;