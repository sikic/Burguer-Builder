import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import BurguerBuilder from "./container/BurguerBuilder/BurguerBuilder";
import Checkout from "./container/Checkout/Checkout";
import { Route, Switch } from "react-router-dom";
import Orders from "./container/Orders/Orders";
class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurguerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
