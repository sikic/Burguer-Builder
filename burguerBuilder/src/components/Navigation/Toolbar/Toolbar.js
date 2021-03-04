import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationsItems from "./NavigationsItems/NavigationsItems";

const Toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <div onClick={props.openSide} className={classes.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <Logo height="80%" className={classes.Logo} />
      <nav className={classes.DesktopOnly}>
        <NavigationsItems token={props.token} />
      </nav>
    </header>
  );
};

export default Toolbar;
