import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import validator from "validator";
import ListItemText from '@material-ui/core/ListItemText';
import EmailList from '../components/EmailList'
import axios from "axios";
import { Grid } from "@material-ui/core";

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      emails: [],
      error: {
        isError: false,
        text: ""
      },
      handleChange: this.handleChange.bind(this),
      addEmail: this.addEmail.bind(this),
      send: this.send.bind(this)
    };
  }

  render() {
    let emails = this.state.emails.map(email => {
      return <ListItemText>{email}</ListItemText>;
    });
    return (
      <Grid container>
        <Grid item xs={12}>
          <h1>Chuck Noris joke sender</h1>
        </Grid>
        <Grid style={{ paddingRight: "5px" }} item xs={9}>
          <TextField
            label="Add email..."
            variant="outlined"
            fullWidth
            name="email"
            type="email"
            onChange={e => {
              this.handleChange(e);
            }}
            value={this.state.email}
            error={this.state.error.isError}
            helperText={this.state.error.text}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={e => {
              this.addEmail(e);
            }}
            style={{
              maxWidth: "55px",
              maxHeight: "55px",
              minWidth: "55px",
              minHeight: "55px"
            }}
          >
            add
          </Button>
        </Grid>
        <Grid item xs={12}>
          <EmailList emails = {emails}/>
          <Button
            variant="contained"
            color="primary"
            onClick={e => {
              this.send(this.state.emails);
            }}
          >
            send
          </Button>
        </Grid>
      </Grid>
    );
  }

  handleChange(e) {
    this.setState({ error: { isError: false, text: "" } });
    const value = e.target.value;
    this.setState({ email: value });
  }
  addEmail(e) {
    const isValid = validator.isEmail(this.state.email);
    if (!isValid) {
      this.setState({ error: { isError: true, text: "invalid entry" } });
      return;
    }
    let emails = this.state.emails;
    emails.push(this.state.email);
    emails.sort(function(a, b) {
      let domA = a.split("@")[1],
        domB = b.split("@")[1],
        domC = a.split("@")[0],
        domD = b.split("@")[0];

      if (domA > domB) {
        return 1;
      } else if (domA === domB) {
        if (domC > domD) return 1;
      } else if (domA < domB) {
        return -1;
      } else if (domA === domD) {
        if (domC < domD) return -1;
      }
      return 0;
    });

    this.setState({ emails: emails });
    this.setState({ email: "" });
  }
  send(mails) {
    axios({
      method: "post",
      url: "/sendMail",
      data: mails
    }).then(res => {
      this.setState({ emails: [] });
    });
  }
}
