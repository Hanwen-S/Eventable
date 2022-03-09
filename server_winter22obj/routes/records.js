const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordsRoutes = express.Router();
// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordsRoutes.route("/records").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("records")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});
recordsRoutes.route("/records/get").get(function (req, res) {
  let db_connect = dbo.getDb();
  console.log('this is line-----------');
  console.log(req.query);
  console.log(req.query.person_email);
  console.log(req.query.person_password);
  var query = { person_email: req.query.person_email , person_password: req.query.person_password};
  db_connect
    .collection("records")
    .find(query)
    .toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

// This section will help you get a single records by id
recordsRoutes.route("/records/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("records")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
recordsRoutes.route("/records/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  console.log(req.body);
  let myobj = {
    person_first_name: req.body.person_first_name,
    person_last_name: req.body.person_last_name,
    person_username: req.body.person_username,
    person_email: req.body.person_email,
    person_phone: "",
    person_password: req.body.person_password,
    person_created_event_array: ["1"],
    person_created_event_id_array: ["1"],
    person_joined_event_array: ["1"],
    person_joined_event_id_array:["1"],
  };
  db_connect.collection("records").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
recordsRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      person_first_name: req.body.person_first_name,
      person_last_name: req.body.person_last_name,
      person_username: req.body.person_username,
      person_phone: req.body.person_phone,
    },
  };
  db_connect
    .collection("records")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you update a record by id.
recordsRoutes.route("/update2/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      person_created_event_array: req.body.person_created_event_array,
      person_created_event_id_array: req.body.person_created_event_id_array,
      person_joined_event_array: req.body.person_joined_event_array,
      person_joined_event_id_array: req.body.person_joined_event_id_array,
    },
  };
  db_connect
    .collection("records")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});


// This section will help you delete a record
recordsRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

module.exports = recordsRoutes;
