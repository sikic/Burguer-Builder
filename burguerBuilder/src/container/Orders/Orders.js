import axios from "../../axios-orders";
import React, { Component } from "react";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import Order from "../../components/Order/CheckOutsummary/Order";

export default withErrorHandler(
  class componentName extends Component {
    state = {
      orders: [],
      laoding: true,
    };
    componentDidMount() {
      axios
        .get("/orders.json")
        .then((res) => {
          const fechrOrder = [];
          for (const key in res.data) {
            fechrOrder.push({ ...res.data[key], id: key });
          }
          this.setState({ laoding: false, orders: fechrOrder });
        })
        .catch((err) => this.setState({ laoding: false }));
    }
    render() {
      return (
        <div>
          {this.state.orders.map((elm) => {
            console.log(elm);
            return (
              <Order
                key={elm.id}
                ingredients={elm.ingredients}
                price={elm.price}
              />
            );
          })}
        </div>
      );
    }
  },
  axios
);
