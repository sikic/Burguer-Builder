import React from "react";
import Burguer from "../../Burguer/Burguer";
import Button from "../../UI/Button/Button";
import classes from "./CheckOutSummary.css";

const CheckOutsummary = (props) => {
  return (
    <div className={classes.CheckOutsummary}>
      <h1>We hope it tastes well!!!!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burguer ingredients={props.ingredients} />
      </div>
      <Button btnType="Success" clicked={props.continueCheckOut}>
        CONTINUE
      </Button>
      <Button btnType="Danger" clicked={props.cancelCheckOut}>
        CANCEL
      </Button>
    </div>
  );
};

export default CheckOutsummary;
