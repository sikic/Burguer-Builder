import React, { Component } from "react";
import CheckOutsummary from "../../components/Order/CheckOutsummary/CheckOutsummary";
import { Route } from "react-router-dom";
import ContentData from "../../components/Order/CheckOutsummary/ContentData/ContentData";

export default class componentName extends Component {
  state = {
    ingredients: null,
    price: 0,
  };
  componentWillMount = () => {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      }
      //["salad","1"]
      else ingredients[param[0]] = +param[1];
    }
    this.setState({ ingredients: ingredients, price: price });
  };
  cancelCheckOut = () => {
    this.props.history.goBack();
  };

  continueCheckOut = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        <CheckOutsummary
          ingredients={this.state.ingredients}
          cancelCheckOut={this.cancelCheckOut}
          continueCheckOut={this.continueCheckOut}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContentData
              ingredients={this.state.ingredients}
              price={this.state.price}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}
