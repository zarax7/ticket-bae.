import React from "react";
import UserLogOut from "../../components/UserLogOut/UserLogOut";
import { Typography } from "@mui/material";

export default function ProfilePage(props) {
  return (
    <div>
      <Typography variant="h3">Profile Page</Typography>
      <br />
      <br />
      <img src="https://i.imgur.com/cvqEXnb.png"></img>
      <UserLogOut setUserInState={props.setUserInState} user={props.user} />
    </div>
  );
}
