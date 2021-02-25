import React from "react";
import Auxiliar from "../../../hoc/Auxiliar";

const OrderSumary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients).map((elm) => {
    return (
      <li key={elm}>
        <span style={{ textTransform: "capitalize" }}>{elm}:</span>{" "}
        {props.ingredients[elm]}
      </li>
    );
  });

  return (
    <Auxiliar>
      <h3> Your order</h3>
      <p> A delicious burguer with the following ingredients:</p>
      <ul>{ingredientsSummary}</ul>
      <p>Continue to CheckOut??</p>
    </Auxiliar>
  );
};

export default OrderSumary;
