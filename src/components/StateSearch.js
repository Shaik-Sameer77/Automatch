import React, { useState, useEffect } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import './StateSearch.css';

function StateSearch() {
  const [states, setStates] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetchStates();
  }, []);

  async function fetchStates() {
    try {
      const response = await fetch('https://cdn-api.co-vin.in/api/v2/admin/location/states');
      const data = await response.json();
      setStates(data.states);
    } catch (error) {
      console.log('Error:', error);
    }
  }

  function handleInputChange(event) {
    const userInput = event.target.value;
    setSearchInput(userInput);

    const matchingStates = states.filter(state =>
      state.state_name.toLowerCase().startsWith(userInput.toLowerCase())
    );
    setSuggestions(matchingStates);
  }

  function handleSuggestionClick(stateName) {
    setSearchInput(stateName);
    setSuggestions([]);
  }

  return (
    <div className="search-container">
      <h1>State Search</h1>
      <div className="search-bar">
        <RiSearchLine className="search-icon" />
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          placeholder="Search for a State..."
          className="search-input"
        />
      </div>
      {searchInput && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map(suggestion => (
            <li key={suggestion.state_id} onClick={() => handleSuggestionClick(suggestion.state_name)}>
              {suggestion.state_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StateSearch;
