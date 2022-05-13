var express = require("express");
var path = require("path");
var logger = require("morgan");
require("dotenv").config();
require("./backend/config/database");
var bodyParser = require("body-parser");
require("body-parser-zlib")(bodyParser);

const auth = require("./backend/config/auth");

const app = express();
require("./backend/config/database");

const port = process.env.PORT || 3001;

app.use(logger("dev"));
app.use(express.json());

app.use(auth);

app.use(express.static(path.join(__dirname, "./build")));

app.use("/api/users", require("./backend/routes/api/users"));
app.use("/api/savedShows", require("./backend/routes/api/savedShows"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
