import React from "react";
import classes from "./Burguer.css";
import BurguerIngredients from "../BurguerIngredients/BurguerIngredients";

const Burguer = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((elm) => {
      return [...Array(props.ingredients[elm])].map((_, i) => {
        return <BurguerIngredients key={elm + i} type={elm} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding some ingredients!</p>;
  }
  return (
    <div className={classes.Burguer}>
      <BurguerIngredients type="bread-top" />
      {transformedIngredients}
      <BurguerIngredients type="bread-bottom" />
    </div>
  );
};

export default Burguer;
