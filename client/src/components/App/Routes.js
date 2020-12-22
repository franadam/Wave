import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from '../../hoc/Layout/Layout';
import Home from '../Home/Home';
import Authentication from '../Authentication/Authentication';
import Signup from '../Authentication/Signup/Signup';
import Dashboard from '../Dashboard/Dashboard';

export const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Authentication} />
        <Route path="/user/dashboard" exact component={Dashboard} />
        <Route path="/signup" exact component={Signup} />
        <Redirect to="/auth" />
      </Switch>
    </Layout>
  );
};
