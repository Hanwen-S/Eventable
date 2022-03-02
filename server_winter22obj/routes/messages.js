const express = require("express");

// timeSlotsRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const messagesRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the time slots.
messagesRoutes.route("/messages").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("messages")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});
messagesRoutes.route("/messages/get").get(function (req, res) {
  let db_connect = dbo.getDb("employees");
  console.log('this is line-----------');
  console.log(req.query);
  console.log(req.query.message_sender_id);
  console.log(req.query.message_receiver_id);
  console.log(req.query.message_content);
  var query = {message_sender_id:req.query.message_sender_id,
    message_receiver_id: req.query.message_receiver_id, message_content:req.query.message_content};
  db_connect
    .collection("messages")
    .find(query)
    .toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

// This section will help you get a single record by id
messagesRoutes.route("/messages/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("messages")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
messagesRoutes.route("/messages/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  console.log(req.body);
  let myobj = {
    message_sender_id:req.body.message_sender_id,
    message_receiver_id: req.body.message_receiver_id,
    message_content:req.body.message_content
  };
  db_connect.collection("messages").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

module.exports = messagesRoutes;
