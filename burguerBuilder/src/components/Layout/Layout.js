import React from "react";
import Auxiliar from "../../hoc/Auxiliar";
import classes from "./Layout.css";

const Layout = (props) => (
  <Auxiliar>
    <div>Toolbar,SideDrawer,Backdrops</div>
    <main className={classes.Content}>{props.children}</main>
  </Auxiliar>
);

export default Layout;
