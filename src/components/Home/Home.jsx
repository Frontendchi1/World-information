import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function Home() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [availableContinents, setAvailableContinents] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);

        // Extract available continents from the fetched data
        const continents = Array.from(new Set(response.data.map((country) => country.region)));
        setAvailableContinents(['all', ...continents]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    // Load dark mode preference from local storage
    const isDarkModePreferred = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkModePreferred);
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilter = (event) => {
    setRegionFilter(event.target.value);
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  const filteredCountries = countries.filter((country) => {
    if (regionFilter !== 'all' && regionFilter !== country.region) {
      return false;
    }
    return country.name.common.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className={`container ${darkMode ? 'dark' : 'light'}`}>
     
        <div className='first-mode'>
        <h1 className="title">Where is the World?</h1>
        <button
          className="dark-mode-button"
          onClick={() => setDarkMode(!darkMode)}
        >
          <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        </div>
        <div className='second-mode'>
        <div className="search-bar">
        <input
          type="text"
          placeholder="&#128269; Search for a country..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
           <div className="filters">
        <select className="select-region" value={regionFilter} onChange={handleFilter}>
            {availableContinents.map((continent) => (
              <option key={continent} value={continent}>
                {continent === 'all' ? 'Filter by Region' : continent}
              </option>
            ))}
          </select>
         
        </div>
        </div>
       
           <div className="countries">
        {filteredCountries.map((country) => (
          <Link key={country.cca2} to={`/country/${country.cca2}`} className="country-link">
            <div className="country">
              <img className='image' src={country.flags.png} alt={`${country.name.common} flag`} />
              <h3>{country.name.common}</h3>
              <p>Population: {country.population}</p>
              <p>Region: {country.region}</p>
              <p>Capital: {country.capital}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
