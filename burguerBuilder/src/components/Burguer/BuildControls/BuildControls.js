import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>{" "}
      </p>
      {controls.map((ctr) => (
        <BuildControl
          key={ctr.label}
          label={ctr.label}
          add={() => props.add(ctr.type)}
          remove={() => props.remove(ctr.type)}
          disabledInfo={props.disabledInfo[ctr.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.pruchaseable}
        onClick={props.ordered}
      >
        {props.token ? "ORDER NOW" : "SIGN IN TO CONTINUE"}
      </button>
    </div>
  );
};

export default BuildControls;
