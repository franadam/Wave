import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from '../Dashboard/Dashboard';
import AddProduct from '../Admin/AddProduct/AddProduct';
import ManageCategories from '../Admin/ManageCategories/ManageCategories';
import Basket from '../Admin/Basket/Basket';
import ManageSiteInfo from '../Admin/SiteInfo/ManageSiteInfo';

import Layout from '../../hoc/Layout/Layout';
import AuthenticationCheck from '../../hoc/Authentication/AuthenticationCheck';
import Home from '../Home/Home';
import Authentication from '../Authentication/Authentication';
import Signup from '../Authentication/Signup/Signup';
import Shop from '../Shop/Shop';
import Guitar from '../Guitar/Guitar';
import EditProfile from '../Dashboard/EditProfile/EditProfile';
import NotFoundPage from '../UI/404/NotFoundPage';

export const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route
          path="/user/dashboard"
          exact
          component={AuthenticationCheck(Dashboard, true)}
        />
        <Route
          path="/user/basket"
          exact
          component={AuthenticationCheck(Basket, true)}
        />
        <Route
          path="/user/profile"
          exact
          component={AuthenticationCheck(EditProfile, true)}
        />
        <Route
          path="/admin/add_product"
          exact
          component={AuthenticationCheck(AddProduct, true)}
        />
        <Route
          path="/admin/manage_categories"
          exact
          component={AuthenticationCheck(ManageCategories, true)}
        />
        <Route
          path="/admin/site_info"
          exact
          component={AuthenticationCheck(ManageSiteInfo, true)}
        />

        <Route path="/guitar/:id" exact component={AuthenticationCheck(Guitar, null)} />
        <Route path="/home" exact component={AuthenticationCheck(Home, null)} />
        <Route
          path="/auth"
          exact
          component={AuthenticationCheck(Authentication, false)}
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
        <Route path="/" exact component={AuthenticationCheck(Home, null)} />
        <Route component={AuthenticationCheck(NotFoundPage, null)} />
      </Switch>
    </Layout>
  );
};
