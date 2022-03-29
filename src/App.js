import './App.css';
import { getConfig } from './services/config.service';
import React, { useState, useEffect } from 'react';

function App() {
  const [config, setConfig] = useState({ loading: true, data: {} });
  const { loading, data } = config;
  var subdomain = window.location.hostname.split('.')[1] ? window.location.host.split('.')[0] : false;
  console.log(subdomain)

  const tenantData = [
    {
      organizationName: "boost",
      tenantName: "Michael Scott",
      numberOfStudents: "20",
      location: "New York City",
      paymentPlan: "Free",
      logo: "data:image/png;base64,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"
    },
    {
      organizationName: "leapfrog",
      tenantName: "John Travolta",
      numberOfStudents: "10",
      location: "Washington DC",
      paymentPlan: "Free",
      logo: "https://cdn-images-1.medium.com/max/1200/1*aWE50S8Qrg9_J92TBllwAg.jpeg"
    }
  ]

  const currentTenant = tenantData.find((tenantInfo) => tenantInfo.organizationName === subdomain)

  useEffect(() => {
    async function getConfigAsync() {
      const { data } = await getConfig();
      setConfig({ data });
    }

    getConfigAsync();
  }
    , []);

  return (
    <div className="App">
      <header className="App-header">
        <p style={{ textTransform: 'capitalize' }}>
          <img style={{ width: '150px', height: '150px' }} alt="logo" src={currentTenant.logo}></img>
          <h2>{`Tenant data for ${subdomain}`}</h2>

          <p >Institute Name : {currentTenant.organizationName}</p>
          <p>Number of students : {currentTenant.numberOfStudents}</p>
          <p>Location : {currentTenant.location}</p>
          <p>Institute Admin: {currentTenant.tenantName}</p>


        </p>

      </header>
    </div>
  );
}

export default App;
