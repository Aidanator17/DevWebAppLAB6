const express = require("express");
const { Store } = require("express-session");
const database = require("../models/userModel").database;
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const request = require('request');

router.get("/", (req, res) => {
  res.redirect('/dashboard');
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
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
          database,
          img_url: 'https://timesofindia.indiatimes.com/photo/67586673.cms',
          val: [false, null]
        });
      }
    });
  }
  if (req.user.role == 'admin') {
    res.redirect('/admin')
  }
});



router.get("/admin", ensureAuthenticated, (req, res) => {
  const store = req.sessionStore;


  if (req.user.role == 'user') {
    res.redirect("/dashboard");
  }
  if (req.user.role == 'admin') {
    store.all((error, sessions) => {
      if (error) {
        console.log(error);
      } else {
        console.log(sessions);
        res.render('admin', {
          user: req.user,
          sessions,
          database,
          img_url: req.user.imageurl
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
  if (req.user.role == 'admin') {
    store.all((error, sessions) => {
      if (error) {
        console.log(error);
      } else {
        console.log(sessions);
        res.render('admindashboard', {
          user: req.user,
          sessions,
          database,
          img_url: req.user.imageurl,
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
                img_url: req.user.imageurl,
                val: [true, JSON.parse(body)]
              })
            };
            if (req.user.role == 'user') {
              res.render('dashboard', {
                user: req.user,
                sessions,
                database,
                img_url: req.user.imageurl,
                val: [true, JSON.parse(body)]
              });
            }
          }
        })
      }
    }
  })
});


module.exports = router;