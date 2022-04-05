const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// create express app
const app = express();
dotenv.config();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());
const port = Number(process.env.PORT || 4000);
// parse application/json
app.use(bodyParser.json());

// define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Todo app" });
});

require("./routes/todo.routes")(app);

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
