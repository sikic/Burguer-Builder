import React from "react";
import classes from "./NavigationsItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationsItems = (props) => {
  return (
    <ul className={classes.NavigationsItems}>
      <NavigationItem link="/" active>
        Burguer Builder
      </NavigationItem>
      <NavigationItem link="/">CheckOut</NavigationItem>
    </ul>
  );
};

export default NavigationsItems;
