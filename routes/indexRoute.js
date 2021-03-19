const express = require("express");
const { Store } = require("express-session");
const database = require("../models/userModel").database;
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

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
              database
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
              database
          });
      }
  });
  }
});

router.get("/revoke", (req, res) => {
  const store = req.sessionStore;
  let sid = req.query.sid
  store.destroy(sid,(error) => {
    if (error) {
        console.log(error);
    }});
  res.redirect("/admin");
});

router.get("/revokeall", (req, res) => {
  const store = req.sessionStore;
  let sid = req.query.sid
  for (id in sid){
  store.destroy(id,(error) => {
    if (error) {
        console.log(error);
    }});
  }
  res.redirect("/admin");
});

module.exports = router;