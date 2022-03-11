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
  var query = {
    person_email: req.query.person_email,
    person_password: req.query.person_password
  };
  db_connect
    .collection("records")
    .find(query)
    .toArray(function(err, result) {
    if (err) throw err;
    //console.log(result);
    res.json(result);
  });
});

recordsRoutes.route("/records/old").get(function (req, res) {
  let db_connect = dbo.getDb();
  var query = {
    person_username: req.query.person_username
  };
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

// This section will help you get a single event by event name
recordsRoutes.route("/record/:name").get(function (req, res) {
  console.log('hiiiiiiii');
  let db_connect = dbo.getDb();
  console.log(req);
  let myquery = { person_username: req.params.name};
  db_connect
      .collection("records")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        console.log(result);
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
    person_created_event_array: [],
    person_created_event_id_array: [],
    person_joined_event_array: [],
    person_joined_event_id_array:[],
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
  console.log(req)
  let newvalues = {
    $set: {
      person_created_event_array: req.body.person_created_event_array,
      person_created_event_id_array: req.body.person_created_event_id_array,
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
recordsRoutes.route("/update3/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
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

// This section will help you delete all record
recordsRoutes.route("/deleteallrecord/:id").delete(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = {};
  db_connect.collection("records").deleteMany(myquery, function (err, res) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(res);
  });
});

module.exports = recordsRoutes;
