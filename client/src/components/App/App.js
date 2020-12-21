import React from 'react';
import axios from 'axios';

import { Routes } from './Routes';

const App = () => {
  axios
    .get('api/products/guitars')
    .then((res) => {
      console.log('res :>> ', res);
    })
    .catch((error) => console.log('error', error));
  return (
    <div className="container">
      <Routes />
    </div>
  );
};

export default App;
