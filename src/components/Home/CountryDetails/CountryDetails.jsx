import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './CountryDetails.css';

function CountryDetails() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Load dark mode preference from local storage
    const isDarkModePreferred = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkModePreferred);
  }, []);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v2/alpha/${code}`);
        setCountry(response.data);
        setBorderCountries(response.data.borders);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchCountryData();
  }, [code]);

  useEffect(() => {
    // Apply dark mode class to body
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className={`container ${darkMode ? 'dark' : 'light'}`}>
      {country && (
        <div className="country-details">
          <div className="header">
            <Link to="/" className="back-button">
            &lt;Back
            </Link>
            <img src={country.flags.png} alt={`${country.name} flag`} />
          </div>
          <div className="country-info">
            <h2>{country.name}</h2>
            <p>Population: {country.population}</p>
            <p>Region: {country.region}</p>
            <p>Subregion: {country.subregion}</p>
            <p>Capital: {country.capital}</p>
          </div>
          {borderCountries.length > 0 && (
            <div className="border-countries">
              <p>Border Countries:</p>
              <ul>
                {borderCountries.map((borderCode) => {
                  return (
                    <li key={borderCode}>
                      <Link to={`/country/${borderCode}`}>
                        <button className="border-button">
                          {borderCode}
                        </button>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CountryDetails;
