const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const TwitchStrategy = require("passport-twitch-new").Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const InstagramStrategy = require('passport-instagram').Strategy;
const SlackStrategy = require('passport-slack').Strategy;
const userController = require("../controllers/userController");
const userModel = require("../models/userModel").userModel;
const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const GithubLogin = new GitHubStrategy({
  clientID: 'e9066d948bb1dc85a469',
  clientSecret: 'ec45d288e82d147852fea808d8401f22e9d7f1a7',
  callbackURL: "http://localhost:8000/auth/github/callback"
},
function(accessToken, refreshToken, profile, cb) {
  let user = userController.getUserByGithubIdOrCreate(profile)
  return cb(null, user);
}
)

const TwitchLogin = new TwitchStrategy({
  clientID: 'da93knokd48iuran0qvokd1i9yk76h',
  clientSecret: '1fyflxlsqss52xm532a7pimdhm00fz',
  callbackURL: "http://localhost:8000/auth/twitch/callback",
  scope: "user_read"
},
function(token, tokenSecret, profile, cb) {
  let user = userController.getUserByTwitchIdOrCreate(profile)
  return cb(null, user);
}
);

const SlackLogin = new SlackStrategy({
  clientID: '1865359010288.1838448905509',
  clientSecret: '896005c8c12a382a297739af1d9bfc6a'
}, function(token, tokenSecret, profile, cb) {
  console.log('!!!!!!!!',profile)
  let user = userController.getUserByTwitchIdOrCreate(profile)
  return cb(null, user);
}
);


//NOT PROPERLY IMPLEMENTED 
const TwitterLogin = new TwitterStrategy({
  requestTokenURL: 'https://api.twitter.com/oauth/request_token',
  accessTokenURL: 'https://api.twitter.com/oauth/access_token',
  userAuthorizationURL: 'https://api.twitter.com/oauth/authenticate',
  consumerKey: 'luIX5nCXM72umtFcVkOlcDrTi',
  consumerSecret: 'Q6ZhBKQYoFM3Aileeu4V2Dmblanm5WztJv5rx0Ec7keZenFEyx',
  callbackURL: "http://127.0.0.1:8000/auth/twitter/callback"
},
function(token, tokenSecret, profile, cb) {
  let user = userController.getUserByGithubIdOrCreate(profile)
  return cb(null, user);
}
);

const LinkedInLogin = new LinkedInStrategy({
  clientID: 'LINKEDIN_KEY',
  clientSecret: 'LINKEDIN_SECRET',
  callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_liteprofile'],
}, function(accessToken, refreshToken, profile, done) {
  let user = userController.getUserByTwitchIdOrCreate(profile)
  return cb(null, user)});

const InstagramLogin = new InstagramStrategy({
  clientID: 'INSTAGRAM_CLIENT_ID',
  clientSecret: 'INSTAGRAM_CLIENT_SECRET',
  callbackURL: "http://127.0.0.1:3000/auth/instagram/callback"
},
function(token, tokenSecret, profile, cb) {
  let user = userController.getUserByTwitchIdOrCreate(profile)
  return cb(null, user);
}
);
module.exports = passport.use(GithubLogin),passport.use(localLogin),passport.use(TwitterLogin),passport.use(TwitchLogin),passport.use(LinkedInLogin),passport.use(InstagramLogin),passport.use(SlackLogin); //Facebook, Google, Imgur, Reddit, Slack, Spotify, Steam
