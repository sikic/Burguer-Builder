import React from "react";
import classes from "./Burguer.css";
import BurguerIngredients from "../BurguerIngredients/BurguerIngredients";

const Burguer = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurguerIngredients key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
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
