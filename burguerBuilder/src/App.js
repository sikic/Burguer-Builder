import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import BurguerBuilder from "./container/BurguerBuilder/BurguerBuilder";
import { BrowserRouter as Browser } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Browser>
        <div>
          <Layout>
            <BurguerBuilder />
          </Layout>
        </div>
      </Browser>
    );
  }
}

export default App;
