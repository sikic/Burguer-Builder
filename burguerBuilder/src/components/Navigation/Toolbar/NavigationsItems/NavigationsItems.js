import React from "react";
import classes from "./NavigationsItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationsItems = (props) => {
  return (
    <ul className={classes.NavigationsItems}>
      <NavigationItem link="/" exact>
        Burguer Builder
      </NavigationItem>
      {props.token ? (
        <NavigationItem link="/orders">Orders</NavigationItem>
      ) : null}
      {props.token ? (
        <NavigationItem link="/logout">End Session</NavigationItem>
      ) : (
        <NavigationItem link="/auth">Login</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationsItems;
