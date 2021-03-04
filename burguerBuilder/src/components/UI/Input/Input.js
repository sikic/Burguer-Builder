import React from "react";
import classes from "./Input.css";

const Input = (props) => {
  let elm = null;
  const inputClasses = [classes.InputElm];
  if (props.invalid && props.shouldValidate && props.touched)
    inputClasses.push(classes.Invalid);
  switch (props.elemntType) {
    case "input":
      elm = (
        <input
          className={inputClasses.join(" ")}
          {...props.elemntConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textArea":
      elm = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elemntConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      break;

    default:
      elm = (
        <input
          className={inputClasses.join(" ")}
          {...props.elemntConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {elm}
    </div>
  );
};

export default Input;
