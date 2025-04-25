import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import { useLocation } from 'react-router-dom';
import qs from 'qs';

const DoctorListing = () => {
  const [doctors, setDoctors] = useState([]);
  const location = useLocation();

  useEffect(() => {
    axios.get('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json')
      .then(res => setDoctors(res.data))
      .catch(err => console.error(err));
  }, []);

  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const searchTerm = query.search || '';

  const filteredDoctors = doctors.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header doctors={doctors} />
      <h2>Doctors</h2>
      {filteredDoctors.length > 0 ? (
        filteredDoctors.map(doc => (
          <div key={doc.id}>{doc.name}</div>
        ))
      ) : (
        <p>No doctors found.</p>
      )}
    </div>
  );
};

export default DoctorListing;
