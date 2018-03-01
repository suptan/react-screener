import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About } from './containers';
import { DashboardContainer } from './containers/jitta/dashboard';
import { TsetDashboardContainer } from './containers/tset/dashboard';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/jitta" component={DashboardContainer} />
    <Route path="/tset" component={TsetDashboardContainer} />
    <Route path="/about" component={About} />
  </Switch>
);

export default Routes;
