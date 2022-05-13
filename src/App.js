import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage/AuthPage";
import HomePage from "./pages/HomePage/HomePage";
import Nav from "./components/Navbar/Nav";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SavedShowsPage from "./pages/SavedShowsPage/SavedShowsPage";
import { Typography, Box } from "@mui/material";

class App extends React.Component {
  state = {
    user: null,
  };
  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData });
  };

  componentDidMount = () => {
    let token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem("token");
        token = null;
      } else {
        let userDoc = payload.user;
        this.setState({ user: userDoc });
      }
    }
  };

  render() {
    return (
      <div className="App">
        {this.state.user ? (
          <div>
            <div className="log">
              <Nav />
            </div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/profile"
                element={
                  <ProfilePage
                    setUserInState={this.setUserInState}
                    user={this.state.user}
                  />
                }
              />
              <Route path="/savedShows" element={<SavedShowsPage />} />
            </Routes>
          </div>
        ) : (
          <AuthPage setUserInState={this.setUserInState} />
        )}
        <Box sx={{ bgcolor: "background.paper", p: 24 }} component="footer">
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Copyright © GA - Team Java the Hut 2022
          </Typography>
        </Box>
      </div>
    );
  }
}

export default App;
