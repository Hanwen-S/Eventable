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

EventsRoutes.route("/events/get").get(function (req, res) {
  let db_connect = dbo.getDb();
  var query = {creator_id: req.query.creator_id};
  //console.log(query);
  db_connect
    .collection("events")
    .find(query)
    .toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

EventsRoutes.route("/events/get1").get(function (req, res) {
  let db_connect = dbo.getDb();
  var query = {
    participants_id: req.query.participants_id};
  //console.log(query);
  db_connect
    .collection("events")
    .find(query)
    .toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you get a single event by id
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

// This section will help you get a single event by event name
EventsRoutes.route("/event/:name").get(function (req, res) {
  console.log('hiiiiiiii');
  let db_connect = dbo.getDb();
  console.log(req);
  let myquery = { event_name: req.params.name};
  db_connect
      .collection("events")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result);
      });
});

// This section will help you create a new event.
EventsRoutes.route("/events/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  console.log(req.body);
  let myobj = {
        creator_id: req.body.creator_id,
        creator_name: req.body.creator_name,
        participants_id:[],
        participants_name: [req.body.creator_name],
        event_name: req.body.event_name,
        date: req.body.date,
        address: req.body.address,
        status: false,
        planned_start_time: req.body.planned_start_time,
        planned_end_time: req.body.planned_end_time,
        description: req.body.description,
        //potential_time_slots: [[1, 2], [2, 3]],
        //comment: req.query.comment,
  };
  db_connect.collection("events").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update an event by id.
EventsRoutes.route("/addperson/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  console.log(req.body);
  let name = (req.body.names);
  let id = (req.body.ids);
  name.push(", ")
  name.push(req.body.person_name);
  id.push(req.body.person_id);
  let newvalues = {
    $set: {
        participants_name: name,
        participants_id: id,
    },
  };
  db_connect
    .collection("events")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 person added");
      response.json(res);
    });
});

// This section will help you update an event by id.
EventsRoutes.route("/update1/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
        event_name: req.body.new_event_name,
        date: req.body.new_date,
        address: req.body.new_address,
        status: false,
        planned_start_time: req.body.new_planned_start_time,
        planned_end_time: req.body.new_planned_end_time,
        description: req.body.new_description,
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
EventsRoutes.route("/delete1/:id").delete(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("events").deleteOne(myquery, function (err, res) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(res);
  });
});

// // This section will help you delete all record
// EventsRoutes.route("/deleteallevent/:id").delete(function (req, response) {
//   let db_connect = dbo.getDb();
//   let myquery = {};
//   db_connect.collection("events").deleteMany(myquery, function (err, res) {
//     if (err) throw err;
//     console.log("1 document deleted");
//     response.json(res);
//   });
// });

module.exports = EventsRoutes;
