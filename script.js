import React, { useState } from 'react';

const App = () => {
  const [locationInput, setLocationInput] = useState('');
  const [locationData, setLocationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const mockData = {
    Hyderabad: { /* all data */ },
    Bangalore: { /* all data */ },
    Mumbai: { /* all data */ },
    Delhi: { /* all data */ },
  };

  const fetchLocationDetails = async (location) => {
    setIsLoading(true);
    setMessage('');
    setLocationData(null);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const formattedLocation = location.charAt(0).toUpperCase() + location.slice(1).toLowerCase();

    if (mockData[formattedLocation]) {
      setLocationData(mockData[formattedLocation]);
      setMessage(`Information for ${formattedLocation}:`);
    } else {
      setMessage("Sorry, no detailed information found. Try Hyderabad, Bangalore, Mumbai, or Delhi.");
    }

    setIsLoading(false);
  };

  const handleSearch = () => {
    if (locationInput.trim()) {
      fetchLocationDetails(locationInput.trim());
    } else {
      setMessage("Please enter a location to search.");
    }
  };

  // JSX render...
};
