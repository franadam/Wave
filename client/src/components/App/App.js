import React from 'react';
import axios from 'axios';

import classes from './App.module.css';

const App = () => {
  axios
    .get('api/products/guitars')
    .then((res) => {
      console.log('res :>> ', res);
    })
    .catch((error) => console.log('error', error));
  return <div className={classes.main}>My app</div>;
};

export default App;
