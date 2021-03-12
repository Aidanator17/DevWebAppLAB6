const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();


//LOCAL
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});


//GITHUB
router.get("/github", forwardAuthenticated, (req, res) => res.redirect("https://github.com/login/oauth/authorize?client_id=e9066d948bb1dc85a469"));

router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/auth/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });


//TWITTER
router.get("/twitter", forwardAuthenticated, (req, res) => res.redirect("https://api.twitter.com/oauth/authorize?oauth_token=luIX5nCXM72umtFcVkOlcDrTi"));

router.get('/twitter',
  passport.authenticate('twitter'));

router.get('/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/auth/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });


//TWITCH
router.get("/twitch", forwardAuthenticated,
 (req, res) => res.redirect("https://id.twitch.tv/oauth2/authorize?client_id=da93knokd48iuran0qvokd1i9yk76h&redirect_uri=http://localhost:8000/auth/twitch/callback&response_type=token&scope=user_read"));

router.get("/twitch",
 passport.authenticate("twitch"));

router.get("/twitch/callback",
 passport.authenticate("twitch", { failureRedirect: "/auth/login" }),
 function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/dashboard");
});

//SLACK
router.get("/slack", forwardAuthenticated,
 (req, res) => res.redirect("https://slack.com/oauth/v2/authorize?user_scope=users.profile:read&client_id=1865359010288.1838448905509"));

router.get('/slack', passport.authorize('slack'));

router.get('/slack/callback', 
  passport.authorize('slack', { failureRedirect: '/auth/login' }),
  (req, res) => res.redirect('/dashboard')
);

//IMGUR
router.get('/imgur', forwardAuthenticated,
 (req,res) => res.redirect("https://api.imgur.com/oauth2/authorize?client_id=d8a75d599407d81&response_type=token&state="))

router.get('/imgur',
  passport.authenticate('imgur'));

router.get('/imgur/callback', 
  passport.authenticate('imgur', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });

//LinkedIn


router.get('/linkedin',
  passport.authenticate('linkedin', { state: 'SOME STATE'  }),
  function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });

router.get('/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/dashboard',
  failureRedirect: '/auth/login'
}));

//REDDIT
router.get('/reddit', forwardAuthenticated,
 (req,res) => res.redirect("https://www.reddit.com/api/v1/authorize?client_id=Ym8x5Lg8tVfafw&response_type=code&state=stated&redirect_uri=http://localhost:8000/auth/reddit/callback&duration=permanent&scope=identity"))

router.get('/reddit',
  passport.authenticate('reddit'));

router.get('/reddit/callback',
  passport.authenticate('reddit', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });

module.exports = router;