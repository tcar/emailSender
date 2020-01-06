import React, { Component } from "react";

import Main from "./containers/main";
import { BrowserRouter as Router } from "react-router-dom";
import { Grid } from "@material-ui/core";

export default class App extends Component {
  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={9}>
          <Main />
        </Grid>
      </Grid>
    );
  }
}
