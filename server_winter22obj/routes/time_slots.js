const async = require("async");
const { request } = require("express");
const express = require("express");

// timeSlotsRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const timeSlotsRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// get all slots owned by a user
timeSlotsRoutes.route("/time_slots/get").get(function (req, res) {
  let db_connect = dbo.getDb();
  var query = {user_id: req.query.user_id};
  //console.log(query);
  db_connect
    .collection("time_slots")
    .find(query)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// create a new time slot
timeSlotsRoutes.route("/time_slots/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    year: req.body.year,
    month: req.body.month,
    day: req.body.day,
    start_index: req.body.start_index, // 0-47
    end_index: req.body.end_index, // 0-47
    coefficient: req.body.coefficient,
    user_id: req.body.user_id
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
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
        start_index: req.body.start_index, // 0-47
        end_index: req.body.end_index, // 0-47
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

timeSlotsRoutes.route("/time_slots/goget_times").get((req, response) => {
  let db_connect = dbo.getDb();
  console.log("begin---------");
  //console.log(req.query);
  console.log("end---------");
  let new_pairs = req.query.pairs.map(a => (JSON.parse(a)));
  console.log(new_pairs)
  let final_list = []
  function onsSearch (pair, callback) {
    const li = pair[0]
    const date = pair[1]
    const [year, month, day] = date.split('-');
    console.log(year)
    console.log(month)
    console.log(day)
   db_connect
   .collection("time_slots")
   .find({ user_id : { $in : li }, year: year, month: month, day : day})
   .toArray(function (err, result) {
     if (err) throw err;
     callback(null, result)
   });
  }
  async.map(new_pairs, onsSearch)
  .then( results => {
    console.log(results);
    response.json(results);
}).catch( err => {
    console.log(err);
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


