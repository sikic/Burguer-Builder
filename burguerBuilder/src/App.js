import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import BurguerBuilder from "./container/BurguerBuilder/BurguerBuilder";
import Checkout from "./container/Checkout/Checkout";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Orders from "./container/Orders/Orders";
import Auth from "./container/Auth/Auth";
import Logout from "./container/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as action from "./store/actions/index";

const mapDispachToProps = (dispatch) => {
  return {
    onTryAutoSingup: () => dispatch(action.authCheckState(9)),
  };
};

const mapStateToProps = (state) => {
  return { token: state.auth.token };
};
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSingup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurguerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.token) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurguerBuilder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispachToProps)(App));
