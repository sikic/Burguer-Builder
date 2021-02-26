import React, { Component } from "react";
import Auxiliar from "../../hoc/Auxiliar";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/Toolbar/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    show: false,
  };
  sideDrawerClose = () => {
    this.setState({ show: false });
  };
  toggleSideDrawer = () => {
    this.setState((prevState) => {
      return { show: !prevState.show };
    });
  };
  render() {
    return (
      <Auxiliar>
        <Toolbar openSide={this.toggleSideDrawer} />
        <SideDrawer show={this.state.show} close={this.sideDrawerClose} />
        <main className={classes.Content}>{this.props.children}</main>
      </Auxiliar>
    );
  }
}

export default Layout;
