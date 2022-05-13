import React from "react";
import { Routes, Route } from "react-router-dom";
import "../SearchPage/SearchPage.css";
import { FcSearch } from "react-icons/fc";
import {
  Typography,
  TextField,
  Table,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

class SearchFeature extends React.Component {
  allEvents = [];
  state = {
    name: "",
    date: "",
    location: "",
    event: "",
    savedItem: [],
    hidden: false,
  };

  handleSearch = async (e) => {
    e.preventDefault();
    if (
      this.state.name.length === 0 &&
      this.state.date.length !== 0 &&
      this.state.location.length !== 0
    ) {
      console.log(this.state.date);
      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events?apikey=efomLcpWJQWbkN9TXlGgmOc98CZzZgkh&locale=*&startDateTime=${this.state.date}:00Z&size=150&city=${this.state.location}&countryCode=CA&segmentId=KZFzniwnSyZfZ7v7nJ`
      );
      const showEvents = await response.json();
      const eventName = showEvents._embedded.events;
      const eventDateMapped = eventName.map((el) => el.dates);
      const eventDate = eventDateMapped.map((el) => el.start.dateTime);
      const eventNameMapped = eventName.map((el) => el.name);
      console.log("all events", eventNameMapped);
      for (let i = 0; i < eventNameMapped.length; i++) {
        if (eventDate[i] === this.state.date) {
          this.allEvents.push(
            eventNameMapped[i] + "—" + eventDate[i] + "—" + this.state.location
          );
        } else {
          this.setState({
            event: `There are no upcoming events for ${this.state.name} in ${this.state.location}`,
          });
        }
      }
    } else if (
      this.state.name.length !== 0 &&
      this.state.date.length === 0 &&
      this.state.location.length !== 0
    ) {
      this.setState({
        event: `${this.state.name} has no upcoming shows in ${this.state.location}`,
      });
      const response = await fetch(
        `
        https://app.ticketmaster.com/discovery/v2/events?apikey=efomLcpWJQWbkN9TXlGgmOc98CZzZgkh&keyword=${this.state.name}&locale=*&size=150&city=${this.state.location}&countryCode=CA&segmentId=KZFzniwnSyZfZ7v7nJ`
      );
      const showEvents = await response.json();
      if ("_embedded" in showEvents) {
        const eventName = showEvents._embedded.events;
        const eventDateMapped = eventName.map((el) => el.dates);
        const eventDate = eventDateMapped.map((el) => el.start.dateTime);
        const eventNameMapped = eventName.map((el) => el.name);
        const locationMapped = eventName.map((el) => el._embedded);
        for (let i = 0; i < eventNameMapped.length; i++) {
          if (eventNameMapped[i] === this.state.name) {
            this.allEvents.push(
              eventNameMapped[i] +
                "—" +
                eventDate[i] +
                "—" +
                this.state.location
            );
            this.setState({
              event: `These are the upcoming events for ${this.state.name}`,
            });
          } else {
            this.setState({
              event: `${this.state.name} has upcoming shows in ${this.state.location}`,
            });
          }
        }
      } else {
        this.setState({
          event: `${this.state.name} has no upcoming shows in ${this.state.location}`,
        });
      }
    } else if (
      this.state.name.length !== 0 &&
      this.state.date.length !== 0 &&
      this.state.location.length !== 0
    ) {
      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events?apikey=efomLcpWJQWbkN9TXlGgmOc98CZzZgkh&keyword=${this.state.name}&locale=*&startDateTime=${this.state.date}:00Z&size=150&city=${this.state.location}&countryCode=CA&segmentId=KZFzniwnSyZfZ7v7nJ`
      );
      const showEvents = await response.json();
      const eventName = showEvents._embedded.events;
      const eventDateMapped = eventName.map((el) => el.dates);
      const eventDate = eventDateMapped.map((el) => el.start.dateTime);
      const eventNameMapped = eventName.map((el) => el.name);
      for (let i = 0; i < eventNameMapped.length; i++) {
        if (
          eventNameMapped[i] === this.state.name ||
          eventDate[i] === this.state.date
        ) {
          this.allEvents.push(
            eventNameMapped[i] + "—" + eventDate[i] + "—" + this.state.location
          );
          this.setState({
            event: `These are the upcoming events in ${this.state.location} on ${this.state.date}`,
          });
        } else {
          this.setState({
            event: `There are no upcoming events on ${this.state.date} in ${this.state.location}`,
          });
        }
      }
    } else if (this.state.name.length === 0 && this.state.date.length === 0) {
      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events?apikey=efomLcpWJQWbkN9TXlGgmOc98CZzZgkh&locale=*&size=150&city=${this.state.location}&countryCode=CA&segmentId=KZFzniwnSyZfZ7v7nJ`
      );
      const showEvents = await response.json();
      if ("_embedded" in showEvents) {
        const eventName = showEvents._embedded.events;
        const eventDateMapped = eventName.map((el) => el.dates);
        const eventDate = eventDateMapped.map((el) => el.start.dateTime);
        const eventNameMapped = eventName.map((el) => el.name);
        for (let i = 0; i < eventNameMapped.length; i++) {
          this.allEvents.push(
            eventNameMapped[i] + "—" + eventDate[i] + "—" + this.state.location
          );
          if (this.state.location.length === 0) {
            this.setState({
              event: `These are all the upcoming events`,
            });
          } else {
            this.setState({
              event: `These are all the upcoming events in ${this.state.location}`,
            });
          }
        }
      } else {
        this.setState({
          event: `There are no upcoming events in ${this.state.location}`,
        });
      }
    }
  };

  handleChange = (e) => {
    if (e.target.name || e.target.date === "" || e.target.location === "")
      this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  handleAdd = async (incoming_item) => {
    this.setState({ hidden: true });
    setTimeout(() => {
      this.setState({ hidden: false });
    }, 2000);
    let itemAlreadyExistsInCart = this.state.savedItem.some(
      (obj) => obj.name === incoming_item.target.value
    );
    if (itemAlreadyExistsInCart) {
      this.setState({
        savedItem: this.state.savedItem.map((obj) =>
          obj.name === incoming_item.target.value
            ? { ...obj, qty: obj.qty + 1 }
            : obj
        ),
      });
    } else {
      this.setState({
        savedItem: [
          ...this.state.savedItem,
          { name: incoming_item.target.value, qty: 1 },
        ],
      });
    }
  };

  handleSave = async (evt) => {
    try {
      let jwt = localStorage.getItem("token");
      let fetchResponse = await fetch("/api/savedShows/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({
          savedItem: this.state.savedItem,
        }),
      });
      this.setState({ savedItem: [] });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  getDate(d) {
    let day, month, year, dateSplitted, aux;

    let result = d.match("[0-9]{2}([-/ .])[0-9]{2}[-/ .][0-9]{4}");
    if (null != result) {
      dateSplitted = result[0].split(result[1]);
      day = dateSplitted[0];
      month = dateSplitted[1];
      year = dateSplitted[2];
    }
    result = d.match("[0-9]{4}([-/ .])[0-9]{2}[-/ .][0-9]{2}");
    if (null != result) {
      dateSplitted = result[0].split(result[1]);
      day = dateSplitted[2];
      month = dateSplitted[1];
      year = dateSplitted[0];
    }

    if (month > 12) {
      aux = day;
      day = month;
      month = aux;
    }

    return year + "/" + month + "/" + day;
  }

  render() {
    return (
      <div className="wrapper">
        <div className="wrap">
          <div className="search">
            <div className="searchbar">
              <br />
              <form onSubmit={this.handleSearch} className="form">
                <TextField
                  fullWidth
                  label="Event Name"
                  id="fullWidth"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <TextField
                  fullWidth
                  label="Event Location"
                  id="fullWidth"
                  type="text"
                  value={this.state.location}
                  name="location"
                  onChange={this.handleChange}
                />
                <TextField
                  fullWidth
                  id="fullWidth"
                  type="datetime-local"
                  name="date"
                  value={this.state.date}
                  onChange={this.handleChange}
                />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <button type="submit" onClick={this.handleSearch}>
                        <h1>
                          <FcSearch />
                        </h1>
                      </button>
                    }
                  />
                </Routes>
              </form>
              <Button variant="outlined" onClick={this.handleSave}>
                Save to Your Show List
              </Button>
            </div>
          </div>
        </div>
        <div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className={this.state.hidden ? "hidden" : "shown "}>
            <Typography variant="h5">Added to Saved Show List</Typography>
          </div>

          <div className="wrap2">
            <Typography variant="h5">{this.state.event}</Typography>
            <span></span>
            {this.allEvents &&
              this.allEvents.map((event) => (
                <Table>
                  <TableHead>
                    <TableRow>
                      <td className="td-event">
                        {event.slice(0, event.indexOf("2"))}
                        {this.getDate(event)}
                      </td>
                      <td>
                        <Button
                          variant="outlined"
                          onClick={this.handleAdd}
                          value={event}
                        >
                          Add Event
                        </Button>
                      </td>
                    </TableRow>
                  </TableHead>
                </Table>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchFeature;
