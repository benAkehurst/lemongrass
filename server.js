//
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: S E R V E R   D E P E N D E N C I E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
//
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const async = require("async");
const axios = require("axios");
const firebase = require("firebase");

//
// ──────────────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: S E R V E R   C O N F I G U R A T I O N : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
//
const app = express();
require('dotenv').config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(path.join(__dirname, 'dist')));

var config = {
  apiKey: process.env.FIREBASE_apiKey,
  authDomain: process.env.FIREBASE_authDomain,
  databaseURL: process.env.FIREBASE_databaseURL,
  storageBucket: process.env.FIREBASE_storageBucket,
};
firebase.initializeApp(config);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DEV_DB_CONNECT, function (err) {
  if (err) {
    console.log("Error: " + err);
  } else {
    console.log("Connected to Database")
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: S E R V E R   R O U T E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// ─── MODELS ─────────────────────────────────────────────────────────────────────
//
const User = require('./server/models/userModel');
const MenuItem = require('./server/models/menuItemModel');
const Order = require('./server/models/orderModel');
//
// ─────────────────────────────────────────────────────────────────── MODELS ─────
//
//
// ─── LOGIN AND REGISTER ─────────────────────────────────────────────────────────
//
/**
 * Registers a user in the database
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
app.post('/register-new-user', function (req, res, next) {
  var data = req.body;
  var saltRounds = 10;
  var hash = bcrypt.hashSync(data.password, saltRounds)
  var user = new User({
    email: data.email,
    password: hash,
    name: data.name,
    street: data.street, 
    houseNumber: data.houseNumber,
    postCode: data.postCode,
    phoneNumber: data.phoneNumber
  });
  user.save(function (err, result) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred with sign up',
        error: err
      });
    }
    var token = jwt.sign({
      user: user
    }, 'secret', {
      expiresIn: 7200
    });
    res.status(201).json({
      message: 'User created',
      success: true,
      token: token,
      response: result
    });
  });
});

/**
 * Logs in a user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
app.post('/login', function (req, res, next) {
  var data = req.body.data;
  User.findOne({ email: data.email }, function (err, user) {
    if (err) {
      return res.status(500).json({
        success: false,
        title: 'An error occurred',
        error: {
          message: 'An error occurred - 500',
          error_msg: err
        }
      });
    }
    if (!user) {
      return res.status(401).json({
        success: false,
        title: 'Login failed - no user',
        error: {
          message: 'Invalid login credentials'
        }
      });
    }
    if (!bcrypt.compareSync(data.password, user.password)) {
      return res.status(401).json({
        success: false,
        title: 'Login failed - password match fail',
        error: {
          message: 'Invalid login credentials',
          error_msg: err
        }
      });
    } else {
      res.status(200).json({
        message: 'Successfully logged in',
        success: true,
        obj: user
      });
    }
  });
});

//
// ─────────────────────────────────────────────────────── LOGIN AND REGISTER ─────
//

//
// ─── DATABASE ACTIONS ROUTES ───────────────────────────────────────────────────────
//
/**
 * THIS FUNCTION QURIES MLAB DB AND GETS ALL MENU ITEMS
 */
app.post("/getMenuItems", (req, res) => {
  axios.get('https://api.mlab.com/api/1/databases/lemongrass/collections/menu?apiKey=' + process.env.DB_API)
  .then((data) => {
    res.send({
      success: true,
      msg:'Menu Retreived',
      menu: data.data[0].menu
    })
  })
  .catch((err) => {
    res.send({
      success: false,
      msg:'Failed To Get Menu Items',
      data: err
    })
  });
});

/**
 * GETS ALL THE USERS PAST ORDERS
 * @param {*} req
 * @param {*} res
 */
app.post("/getUserData", function (req, res) {
  User.findById({'_id': req.body.data._id})
    .exec(function (err, user) {
      if (err) {
        console.log("Error: " + " " + err);
        res.send({
          success: false,
          message: err
        });
      } else {
        // console.log(user);
        res.send({
          success: true,
          data: user
        })
      }
    })
});

/**
 * SAVES A NEW ORDER TO THE USER MODEL
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
app.post("/saveNewOrder", (req, res) => {
  let newOrder = req.body.data.new_order;
  let userId = req.body.data._id;
  User.update({_id: userId}, {
      $push: {
        orders_history: newOrder
      }
    }
  )
  .exec((err, user) => {
    if (err) {
      console.log("Error: " + " " + err);
      res.send({
        success: false,
        message: err
      });
    } else {
      res.send({
        success: true,
        msg: 'Order Submited Successfully'
      })
    }
  })
});

//
// ───────────────────────────────────────────────────── DATABASE ACTIONS ROUTES ─────
//

//
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: S E R V E R   R U N   C O M M A N D S   A N D   P O R T   A C C E S S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// Get port from environment and store in Express.
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));
