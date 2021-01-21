import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from '../../hoc/Layout/Layout';
import AuthenticationCheck from '../../hoc/Authentication/AuthenticationCheck';
import Home from '../Home/Home';
import Authentication from '../Authentication/Authentication';
import Signup from '../Authentication/Signup/Signup';


import Dashboard from '../Dashboard/Dashboard';
import Shop from '../Shop/Shop';

export const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/home" exact component={AuthenticationCheck(Home, null)} />
        <Route
          path="/auth"
          exact
          component={AuthenticationCheck(Authentication, false)}
        />
        <Route
          path="/user/dashboard"
          exact
          component={AuthenticationCheck(Dashboard, true)}
        />
        <Route
          path="/signup"
          exact
          component={AuthenticationCheck(Signup, false)}
        />
        <Route
        path="/shop"
        exact
        component={AuthenticationCheck(Shop, null)} 

        />
        <Redirect to="/auth" />
      </Switch>
    </Layout>
  );
};
