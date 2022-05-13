import { Component } from "react";
import {
  Typography,
  Grid,
  Box,
  Avatar,
  Paper,
  Button,
  TextField,
} from "@mui/material";

export default class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const fetchResponse = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        }),
      });

      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");

      let token = await fetchResponse.json();
      localStorage.setItem("token", token);

      const userDoc = JSON.parse(atob(token.split(".")[1])).user;
      this.props.setUserInState(userDoc);
    } catch (err) {
      console.log("SignupForm error", err);
      this.setState({ error: "Sign Up Failed - Try Again" });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign Up Form
            </Typography>

            <form autoComplete="off" onSubmit={this.handleSubmit}>
              <TextField
                margin="normal"
                type="text"
                name="name"
                label="Full Name"
                value={this.state.name}
                onChange={this.handleChange}
                required
                autoComplete="off"
              />
              <TextField
                margin="normal"
                type="email"
                name="email"
                label="Email Address"
                value={this.state.email}
                onChange={this.handleChange}
                required
                autoComplete="off"
              />
              <TextField
                margin="normal"
                type="password"
                name="password"
                label="Password"
                value={this.state.password}
                onChange={this.handleChange}
                required
                autoComplete="off"
              />
              <TextField
                margin="normal"
                type="password"
                name="confirm"
                label="Confirm Password"
                value={this.state.confirm}
                onChange={this.handleChange}
                required
                autoComplete="off"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={disable}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </form>
          </Box>
        </Grid>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}
