const express = require("express");

// timeSlotsRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const EventsRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
const ObjectArray = require("mongodb").ObjectArray;

// This section will help you get a list of all the time slots.
EventsRoutes.route("/events").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("events")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
EventsRoutes.route("/events/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("events")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
EventsRoutes.route("/events/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
        Creator_db_id: req.query.creator_id,
        Creator_Name: req.query.creator_name,
        Participator_db_ids: JSON.parse(req.query.participators),
        Event_name: req.query.event_name,
        Year:  0  ,
        Month: 0 ,
        Date: req.query.event_date,
        Address: req.query.address,
        Status: false, 
        Planned_time: req.query.time, 
        Potential_time_slots: [[1, 2], [2, 3]], 
        Comment: req.query.comment
  };
  db_connect.collection("events").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a time slot by id.
EventsRoutes.route("/events/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
        day_time: req.body.day_time,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        coefficient: req.body.coefficient,
    },
  };
  db_connect
    .collection("events")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
EventsRoutes.route("/events/delete/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("events").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

module.exports = EventsRoutes;
