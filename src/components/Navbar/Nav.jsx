import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import {
  Typography,
  GlobalStyles,
  CssBaseline,
  AppBar,
  Toolbar,
} from "@mui/material";

function Nav() {
  let navigate = useNavigate();
  let clearPage = () => {
    navigate("/");
    window.location.reload(true);
  };
  return (
    <div>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="primary"
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography
            variant="h6"
            color="inherit"
            align="left"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            <button className="button" onClick={clearPage}>
              🎟️ TicketBae 🎟️
            </button>
          </Typography>
          <nav>
            <div className="nav">
              <Link
                className="link"
                color="text.primary"
                sx={{ my: 1, mx: 1.5 }}
                to="/profile"
              >
                Profile
              </Link>
              <Link
                className="link"
                color="text.primary"
                sx={{ my: 1, mx: 1.5 }}
                to="/savedShows"
              >
                Saved Show List
              </Link>
            </div>
          </nav>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Nav;
