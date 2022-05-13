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
    email: "",
    password: "",
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...this.state,
        }),
      };

      const fetchResponse = await fetch("/api/users/login", options);

      if (!fetchResponse.ok) throw new Error("Something went wrong");

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
              Log In
            </Typography>
            <div className="form-container" onSubmit={this.handleSubmit}>
              <form autoComplete="off">
                <TextField
                  margin="normal"
                  type="text"
                  name="email"
                  label="Email Address"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
                <TextField
                  margin="normal"
                  type="password"
                  name="password"
                  label="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Log In
                </Button>
              </form>
            </div>
          </Box>
        </Grid>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}
