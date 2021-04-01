const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const router = express.Router(); const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  OUTSIDEfindById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
  },
  createUserWithOutsideId: (u_id, u_name, u_url, u_method) => {
    database.push(
      {
        id: u_id,
        name: u_name,
        email: null,
        password: null,
        role: 'admin',
        method: u_method,
        imageurl: u_url
      }
    )
  }
};

//REGISTER
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {name, email, password}
    });
    return res.json(user);
  } catch (err) { 
    return res.status(400).json(err)
  }
});



router.get("/register", async (req, res) => {
  
    res.render('register');
  
});

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
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });


//TWITTER
router.get("/twitter", forwardAuthenticated, (req, res) => res.redirect("https://api.twitter.com/oauth/authorize?oauth_token=luIX5nCXM72umtFcVkOlcDrTi"));

router.get('/twitter',
  passport.authenticate('twitter'));

router.get('/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/auth/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });


//TWITCH
router.get("/twitch", forwardAuthenticated,
  (req, res) => res.redirect("https://id.twitch.tv/oauth2/authorize?client_id=da93knokd48iuran0qvokd1i9yk76h&redirect_uri=https://aidansproject.herokuapp.com/auth/twitch/callback&response_type=token&scope=user_read"));

router.get("/twitch",
  passport.authenticate("twitch"));

router.get("/twitch/callback",
  passport.authenticate("twitch", { failureRedirect: "/auth/login" }),
  function (req, res) {
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
  (req, res) => res.redirect("https://api.imgur.com/oauth2/authorize?client_id=d8a75d599407d81&response_type=token&state="))

router.get('/imgur',
  passport.authenticate('imgur'));

router.get('/imgur/callback',
  passport.authenticate('imgur', { failureRedirect: '/auth/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });

//LinkedIn


router.get('/linkedin',
  passport.authenticate('linkedin', { state: 'SOME STATE' }),
  function (req, res) {
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });

router.get('/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/dashboard',
  failureRedirect: '/auth/login'
}));

//REDDIT
router.get('/reddit', forwardAuthenticated,
  (req, res) => res.redirect("https://www.reddit.com/api/v1/authorize?client_id=Ym8x5Lg8tVfafw&response_type=code&state=stated&redirect_uri=https://aidansproject.herokuapp.com/auth/reddit/callback&duration=permanent&scope=identity"))

router.get('/reddit',
  passport.authenticate('reddit'));

router.get('/reddit/callback',
  passport.authenticate('reddit', { failureRedirect: '/auth/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });

//SPOTIFY
router.get('/imgur', forwardAuthenticated,
  (req, res) => res.redirect("https://accounts.spotify.com/authorize?client_id=8cab51c0fd034073ae9b207f1537f418&response_type=code&redirect_uri=https://aidansproject.herokuapp.com/auth/spotify/callback"))



router.get('/spotify', passport.authenticate('spotify'), function (req, res) {
  // The request will be redirected to spotify for authentication, so this
  // function will not be called.
});

router.get(
  '/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/auth/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  }
);

//GOOGLE
router.get('/google', forwardAuthenticated,
  (req, res) => res.redirect("https://accounts.google.com/o/oauth2/v2/auth?client_id=140253723840-gfhpe3kjgfcg2hlcnf0rf2014rkqur5o.apps.googleusercontent.com&redirect_uri=https://aidansproject.herokuapp.com/auth/google/callback&response_type=code&scope=profile"))

router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

//FACEBOOK
router.get('/facebook',
  (req, res) => res.redirect("https://www.facebook.com/v10.0/dialog/oauth?client_id=128267682564398&redirect_uri=https://aidansproject.herokuapp.com/auth/facebook/callback&state="))

router.get('/facebook',
  passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

//INSTAGRAM
router.get('/instagram',
  (req, res) => res.redirect("https://api.instagram.com/oauth/authorize?client_id=942668589893599&redirect_uri=https://aidansproject.herokuapp.com/auth/instagram/callback&scope=user_profile&response_type=code"))

router.get('/instagram',
  passport.authenticate('instagram'));

router.get('/instagram/callback',
  passport.authenticate('instagram', { failureRedirect: '/auth/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
module.exports = router;