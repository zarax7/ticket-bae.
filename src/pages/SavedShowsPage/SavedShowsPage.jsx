import React from "react";
import "./SavedShowsPage.css";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

export default class SavedShowsPage extends React.Component {
  state = {
    showHistory: [],
    qty: [],
  };

  async componentDidMount() {
    try {
      let jwt = localStorage.getItem("token");
      let fetchOrdersResponse = await fetch("/api/savedShows/", {
        headers: { Authorization: "Bearer " + jwt },
      });

      if (!fetchOrdersResponse.ok) throw new Error("Couldn't fetch shows");
      let shows = await fetchOrdersResponse.json();
      this.state.showHistory.push(shows);
      this.setState({ showHistory: shows });
      console.log("shows", this.state.showHistory);
    } catch (err) {
      console.error("ERROR:", err);
    }
  }

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
      <div>
        <Typography variant="h4">
          The following are your saved shows!
        </Typography>
        <br />
        <br />
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {this.state.showHistory.map((events) =>
              events.savedItem.map((e) => (
                <Grid item key={e.name} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image="https://image.shutterstock.com/image-vector/concert-ticket-template-party-festival-600w-2021147534.jpg"
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {e.name.slice(0, e.name.indexOf("2"))}
                      </Typography>
                      <Typography>
                        Date:
                        {this.getDate(e.name)}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Quantity: {e.qty}</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      </div>
    );
  }
}
