import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import qs from 'qs';

const Header = ({ doctors }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    query.search = search.trim();
    navigate(`/?${qs.stringify(query)}`);
  };

  const suggestions = search.length > 0
    ? doctors.filter(doc =>
        doc.name.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 3)
    : [];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search doctor by name"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {suggestions.length > 0 && (
        <ul style={{ border: '1px solid gray', padding: '4px', marginTop: '4px' }}>
          {suggestions.map((doc) => (
            <li
              key={doc.id}
              onClick={() => {
                setSearch(doc.name);
                const query = qs.parse(location.search, { ignoreQueryPrefix: true });
                query.search = doc.name;
                navigate(`/?${qs.stringify(query)}`);
              }}
              style={{ cursor: 'pointer' }}
            >
              {doc.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Header;
