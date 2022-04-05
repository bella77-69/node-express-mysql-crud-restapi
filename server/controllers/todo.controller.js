const mysql = require("mysql");
// connection configurations
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});
// connect to database
connection.connect(function (err) {
  if (err) throw err;
  console.log("You are now connected with mysql database...");
});

// Create and Save a new Todo
exports.create = (req, res) => {
  // Validate request
  const name = req.body.name;
  const description = req.body.description;
  if (!req.body.description) {
    return res.status(400).send({
      message: "Todo description can not be empty",
    });
  }

  var params = req.body;
  console.log(params);

  connection.query(
    "INSERT INTO todos SET ? ",
    params,
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        data: results,
        message: "New todo has been created successfully.",
      });
    }
  );
};

// Retrieve and return all todos from the database.
exports.findAll = (req, res) => {
  connection.query("select * from todos", function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
};

// Find a single todo with a id
exports.findOne = (req, res) => {
  connection.query(
    "select * from todos where Id=?",
    [req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
};

// Update a todo identified by the id in the request
exports.update = (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  // Validate Request
  if (!req.body.description) {
    return res.status(400).send({
      message: "Todo description can not be empty",
    });
  }

  console.log(req.params.id);
  console.log(req.body.description);
  connection.query(
    "UPDATE `todos` SET `name`=?,`description`=? where `id`=?",
    [req.body.name, req.body.description, req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
};

// Delete a todo with the specified id in the request
exports.delete = (req, res) => {
  console.log("Request", req.params.id);
  let sql = `DELETE FROM todos WHERE ID = ${req.params.id}`;
  console.log("HI", sql);

  connection.query(sql, (error, results, fields) => {
    if (error) return console.error("ERROR HI", error.message);
    res.status(200).send(results);
    console.log("Deleted Row(s):", results.affectedRows);
  });
};
