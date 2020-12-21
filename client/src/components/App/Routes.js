import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from '../../hoc/Layout/Layout';

import Home from '../Home/Home';

export const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Layout>
  );
};
