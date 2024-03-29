const express = require("express");
const { Store } = require("express-session");
const router = express.Router();
const { database } = require("../models/userModel")
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const request = require('request');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
let sites = ['https://aidansproject.herokuapp.com','http://localhost:8000']

console.log('INDEX',database)

router.get("/", (req, res) => {
  res.redirect('/dashboard');
});



router.get("/dashboard", ensureAuthenticated, async (req, res) => {
  const store = req.sessionStore;
  if (req.user.role == 'user') {
    store.all((error, sessions) => {
      if (error) {
        console.log(error);
      } else {
        console.log(sessions);
        res.render('dashboard', {
          user: req.user,
          sessions,
          database: database[0],
          img_url: req.user.imageURL,
          val: [false, null]
        });
      }
    });
  }
  if (req.user.role == 'admin' || req.user.role == 'superadmin') {
    res.redirect('/admin')
  }
});



router.get("/admin", ensureAuthenticated, (req, res) => {
  const store = req.sessionStore;


  if (req.user.role == 'user') {
    res.redirect("/dashboard");
  }
  if (req.user.role == 'admin' || req.user.role == 'superadmin') {
    store.all((error, sessions) => {
      if (error) {
        console.log(error);
      } else {
        console.log(sessions);
        res.render('admin', {
          user: req.user,
          sessions,
          database: database[0],
          img_url: req.user.imageURL
        });
      }
    });
  }
});

router.get("/admindashboard", ensureAuthenticated, (req, res) => {
  const store = req.sessionStore;


  if (req.user.role == 'user') {
    res.redirect("/dashboard");
  }
  if (req.user.role == 'admin' || req.user.role == 'superadmin') {
    store.all((error, sessions) => {
      if (error) {
        console.log(error);
      } else {
        console.log(req.user);
        res.render('admindashboard', {
          user: req.user,
          sessions,
          database: database[0],
          img_url: req.user.imageURL,
          val: [false, null]
        });
      }
    });
  }
});

router.get("/revoke", (req, res) => {
  const store = req.sessionStore;
  let sid = req.query.sid
  store.destroy(sid, (error) => {
    if (error) {
      console.log(error);
    }
  });
  res.redirect("/admin");
});

router.get("/revokeall", (req, res) => {
  const store = req.sessionStore;
  store.clear((error) => {
    if (error) {
      console.log(error);
    }
  })
  res.redirect("/admin");
});

router.post("/valorant", (req, res) => {
  const store = req.sessionStore;
  store.all((error, sessions) => {
    if (error) {
      console.log(error);
    } else {
      let acc = req.body.riotid
      if (acc.length < 2) {
        res.redirect('/admindashboard')
      }
      else {
        let acc_info = acc.split('#')
        request('https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/' + acc_info[0] + '/' + acc_info[1] + '?api_key=RGAPI-b54f905e-cb77-4c85-b3a9-7e7cb67718fd', function (error, response, body) {
          if (!error && response.statusCode == 200) {
            if (req.user.role == 'admin') {
              res.render('admindashboard', {
                user: req.user,
                sessions,
                database,
                img_url: req.user.imageURL,
                val: [true, JSON.parse(body)]
              })
            };
            if (req.user.role == 'user') {
              res.render('dashboard', {
                user: req.user,
                sessions,
                database,
                img_url: req.user.imageURL,
                val: [true, JSON.parse(body)]
              });
            }
          }
        })
      }
    }
  })
});

router.get("/superadmin", (req, res) => {
  res.render('superadmin', {
                user: req.user,
                database,
                img_url: req.user.imageURL,
              });
});


module.exports = router;