const express = require("express");

// timeSlotsRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const timeSlotsRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the time slots.
timeSlotsRoutes.route("/time_slots").get(function (req, res) {
  let db_connect = dbo.getDb("employees");
  db_connect
    .collection("time_slots")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single time slot by id
timeSlotsRoutes.route("/time_slots/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("time_slots")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new time slot.
// TODO: Date object in mongodb OR divide Date object into year/month/day
                                              // start time: hour/minutes
timeSlotsRoutes.route("/time_slots/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    day_time: req.query.day_time,
    start_index: req.query.start_index, // 0-47
    end_index: req.query.end_index, // 0-47
    coefficient: req.query.coefficient,
    user_id: req.query.user_id
  };
  db_connect.collection("time_slots").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a time slot by id.
timeSlotsRoutes.route("/time_slots/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
        day_time: req.body.day_time,
        start_index: req.query.start_index, // 0-47
        end_index: req.query.end_index, // 0-47
        coefficient: req.body.coefficient,
    },
  };
  db_connect
    .collection("time_slots")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a time slot
timeSlotsRoutes.route("/time_slots/delete/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("time_slots").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

module.exports = timeSlotsRoutes;
