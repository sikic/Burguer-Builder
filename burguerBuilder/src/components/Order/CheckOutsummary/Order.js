import React from "react";
import classes from "./Order.css";

function Order(props) {
  const ingredients = [];
  for (const name in props.ingredients) {
    ingredients.push({ name: name, amount: props.ingredients[name] });
  }

  const listIngredients = ingredients.map((el) => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
      >
        {el.name + " -> "} {el.amount + " uds"}
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {listIngredients}</p>
      <p>
        Price: <strong>EUR {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
}

export default Order;
