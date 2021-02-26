import React, { Component } from "react";
import Auxiliar from "../../../hoc/Auxiliar";
import Button from "../../UI/Button/Button";

class OrderSumary extends Component {
  componentDidUpdate() {
    console.log("[OrderSumary.js] Will upodate");
  }
  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map(
      (elm) => {
        return (
          <li key={elm}>
            <span style={{ textTransform: "capitalize" }}>{elm}:</span>{" "}
            {this.props.ingredients[elm]}
          </li>
        );
      }
    );
    return (
      <Auxiliar>
        <h3> Your order</h3>
        <p> A delicious burguer with the following ingredients:</p>
        <ul>{ingredientsSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)} </strong>
        </p>
        <p>Continue to CheckOut??</p>
        <Button btnType="Success" clicked={this.props.continue}>
          CONTINUE
        </Button>

        <Button btnType="Danger" clicked={this.props.cancel}>
          CANCEL
        </Button>
      </Auxiliar>
    );
  }
}

export default OrderSumary;
