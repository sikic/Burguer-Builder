import React from "react";
import Auxiliar from "../../../../hoc/Auxiliar";
import Logo from "../../../Logo/Logo";
import NavigationsItems from "../NavigationsItems/NavigationsItems";
import classes from "./SideDrawer.css";
import Backdrop from "../../../UI/Backdrop/Backdrop";

const SideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.show) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Auxiliar>
      <Backdrop show={props.show} clicked={props.close} />
      <div className={attachedClasses.join(" ")}>
        <Logo height="11%" />
        <nav>
          <NavigationsItems token={props.token} />
        </nav>
      </div>
    </Auxiliar>
  );
};

export default SideDrawer;
