import React from "react";
import { Typography, Button } from "@mui/material";

class UserLogOut extends React.Component {
  handleLogout = () => {
    localStorage.removeItem("token");
    this.props.setUserInState(null);
  };

  render() {
    return (
      <div className="UserLogOut">
        <Typography variant="h5">Name: {this.props.user.name}</Typography>
        <Typography variant="h5">Email: {this.props.user.email}</Typography>
        <Button
          onClick={this.handleLogout}
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Log Out
        </Button>
      </div>
    );
  }
}

export default UserLogOut;
