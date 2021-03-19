const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const TwitchStrategy = require("passport-twitch-new").Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const InstagramStrategy = require('passport-instagram').Strategy;
const SlackStrategy = require('passport-slack').Strategy;
const ImgurStrategy = require('passport-imgur').Strategy;
const RedditStrategy = require('passport-reddit').Strategy;
const SpotifyStrategy = require('passport-spotify').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
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
  callbackURL: "https://aidansproject.herokuapp.com/auth/github/callback"
},
function(accessToken, refreshToken, profile, cb) {
  let user = userController.getUserByGithubIdOrCreate(profile)
  return cb(null, user);
}
)

const TwitchLogin = new TwitchStrategy({
  clientID: 'da93knokd48iuran0qvokd1i9yk76h',
  clientSecret: '1fyflxlsqss52xm532a7pimdhm00fz',
  callbackURL: "https://aidansproject.herokuapp.com/auth/twitch/callback",
  scope: "user_read"
},
function(token, tokenSecret, profile, cb) {
  let user = userController.getUserByTwitchIdOrCreate(profile)
  return cb(null, user);
}
);

const ImgurLogin = new ImgurStrategy({
  clientID: 'd8a75d599407d81',
  clientSecret: '107495130112ee2f4995aa180fd464b9011289ff',
  callbackURL: "https://aidansproject.herokuapp.com/auth/imgur/callback"
},
function(accessToken, refreshToken, profile, done) {
  let user = userController.getUserByImgurIdOrCreate(profile)
  return done(null, user);
}
);

const RedditLogin = new RedditStrategy({
  clientID: 'Ym8x5Lg8tVfafw',
  clientSecret: 'OzfgVzTfv2QsCVVuNnPo1wV-QDGmgQ',
  callbackURL: "https://aidansproject.herokuapp.com/auth/reddit/callback"
},
function(accessToken, refreshToken, profile, done) {
  let user = userController.getUserByRedditIdOrCreate(profile)
  return done(null, user);
}
);

const SpotifyLogin = new SpotifyStrategy(
  {
    clientID: '8cab51c0fd034073ae9b207f1537f418',
    clientSecret: '7f2b0229a0c641639a2ed8953ba1c1cd',
    callbackURL: 'https://aidansproject.herokuapp.com/auth/spotify/callback'
  },
  function(accessToken, refreshToken, expires_in, profile, done) {
    console.log('!!!!!!',profile)
    let user = userController.getUserBySpotifyIdOrCreate(profile)
    return done(null, user);
  }
  );

const GoogleLogin = new GoogleStrategy({
  clientID: '140253723840-gfhpe3kjgfcg2hlcnf0rf2014rkqur5o.apps.googleusercontent.com',
  clientSecret: 'vbmQckkQRhBYsJw1ssVqtL1f',
  callbackURL: "https://aidansproject.herokuapp.com/auth/google/callback"
},
function(accessToken, refreshToken, profile, cb) {
  let user = userController.getUserByGoogleIdOrCreate(profile)
  return cb(null, user);
}
)

const FacebookLogin = new FacebookStrategy({
  clientID: '128267682564398',
  clientSecret: '23f07cdcb7060f260bac6054f9e8f6e9',
  callbackURL: "https://aidansproject.herokuapp.com/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, cb) {
  console.log('!!!!!!!!!!!!!',profile)
  let user = userController.getUserByFacebookIdOrCreate(profile)
  return cb(null, user);
}
)


//NOT PROPERLY IMPLEMENTED 
const TwitterLogin = new TwitterStrategy({
  requestTokenURL: 'httpss://api.twitter.com/oauth/request_token',
  accessTokenURL: 'httpss://api.twitter.com/oauth/access_token',
  userAuthorizationURL: 'httpss://api.twitter.com/oauth/authenticate',
  consumerKey: 'luIX5nCXM72umtFcVkOlcDrTi',
  consumerSecret: 'Q6ZhBKQYoFM3Aileeu4V2Dmblanm5WztJv5rx0Ec7keZenFEyx',
  callbackURL: "https://aidansproject.herokuapp.com/auth/twitter/callback"
},
function(token, tokenSecret, profile, cb) {
  let user = userController.getUserByGithubIdOrCreate(profile)
  return cb(null, user);
}
);

const LinkedInLogin = new LinkedInStrategy({
  clientID: 'LINKEDIN_KEY',
  clientSecret: 'LINKEDIN_SECRET',
  callbackURL: "https://aidansproject.herokuapp.com/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_liteprofile'],
}, function(accessToken, refreshToken, profile, done) {
  let user = userController.getUserByTwitchIdOrCreate(profile)
  return cb(null, user)});

const InstagramLogin = new InstagramStrategy({
  clientID: 'INSTAGRAM_CLIENT_ID',
  clientSecret: 'INSTAGRAM_CLIENT_SECRET',
  callbackURL: "https://aidansproject.herokuapp.com/auth/instagram/callback"
},
function(token, tokenSecret, profile, cb) {
  let user = userController.getUserByTwitchIdOrCreate(profile)
  return cb(null, user);
}
);

const SlackLogin = new SlackStrategy({
  clientID: '1865359010288.1838448905509',
  clientSecret: '896005c8c12a382a297739af1d9bfc6a',
  callbackURL: 'httpss://aidansproject.herokuapp.com/auth/slack/callback',
  scope: ['users.profile:read']
}, function(token, tokenSecret, profile, cb) {
  console.log('!!!!!!!!',profile)
  let user = userController.getUserByRedditIdOrCreate(profile)
  return cb(null, user);
}
);

module.exports = passport.use(GithubLogin),
                 passport.use(localLogin),
                 passport.use(TwitterLogin),
                 passport.use(TwitchLogin),
                 passport.use(LinkedInLogin),
                 passport.use(InstagramLogin),
                 passport.use(SlackLogin),
                 passport.use(ImgurLogin),
                 passport.use(RedditLogin),
                 passport.use(SpotifyLogin),
                 passport.use(GoogleLogin),
                 passport.use(FacebookLogin); 
                 //Facebook, Steam