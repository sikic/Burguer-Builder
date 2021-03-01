import React, { Component } from "react";
import Button from "../../../UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../../axios-orders";
import Spinner from "../../../UI/Spinner/Spinner";

export default class componentName extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  orderHandler = (e) => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "luis",
        address: {
          street: "calle piruleta ",
          CP: "28003",
          country: "Spain",
        },
        email: "test@test.com",
      },
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      });
    e.preventDefault();
  };
  render() {
    let form = this.state.loading ? (
      <Spinner />
    ) : (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Your email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Your Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postalCode"
          placeholder="Your postal code"
        />

        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    return (
      <div className={classes.ContactData}>
        <h4>Enter you contact data</h4>
        {form}
      </div>
    );
  }
}
