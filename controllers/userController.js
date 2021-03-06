const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

const getUserByGithubIdOrCreate = (profile) => {
  let user = userModel.OUTSIDEfindById(profile['id']);
  if (user) {
    return user;
  }

  let createdUser = userModel.createUserWithOutsideId(profile['id'],profile['displayName'],profile['_json']['avatar_url'],'Github',profile['id'],profile['id']);
  user = userModel.OUTSIDEfindById(profile['id']);
  if (user) {
    return user;
  }
}

const getUserByTwitchIdOrCreate = (profile) => {
  let user = userModel.OUTSIDEfindById(profile['id']);
  if (user) {
    return user;
  }

  let createdUser = userModel.createUserWithOutsideId(profile['id'],profile['display_name'],profile['profile_image_url'],'Twitch',profile['id'],profile['id']);
  user = userModel.OUTSIDEfindById(profile['id']);
  if (user) {
    return user;
  }
}

const getUserByImgurIdOrCreate = (profile) => {
  let user = userModel.OUTSIDEfindById(profile['id']);
  if (user) {
    return user;
  }

  let createdUser = userModel.createUserWithOutsideId(profile['id'],profile['url'],'Imgur',profile['id'],profile['id']);
  user = userModel.OUTSIDEfindById(profile['id']);
  if (user) {
    return user;
  }
}

const getUserByRedditIdOrCreate = (profile) => {
  let user = userModel.OUTSIDEfindById(profile['id']);
  if (user) {
    return user;
  }

  let createdUser = userModel.createUserWithOutsideId(profile['id'],profile['name'],profile['_json']['icon_img'],'Reddit',profile['id'],profile['id']);
  user = userModel.OUTSIDEfindById(profile['id']);
  if (user) {
    return user;
  }
}

const getUserBySpotifyIdOrCreate = (profile) => {
  let user = userModel.OUTSIDEfindById(profile['id']);
  if (user) {
    return user;
  }

  let createdUser = userModel.createUserWithOutsideId(profile['id'],profile['displayName'],profile['photos'][0]['value'],'Spotify',profile['id'],profile['id']);
  user = userModel.OUTSIDEfindById(profile['id']);
  if (user) {
    return user;
  }
}

const getUserByGoogleIdOrCreate = (profile) => {
  let user = userModel.OUTSIDEfindById(profile['id']);
  if (user) {
    return user;
  }

  let createdUser = userModel.createUserWithOutsideId(profile['id'],profile['displayName'],profile['_json']['picture'],'Google',profile['id'],profile['id']);
  user = userModel.OUTSIDEfindById(profile['id']);
  if (user) {
    return user;
  }
}

const getUserByFacebookIdOrCreate = (profile) => {
  let user = userModel.OUTSIDEfindById(profile['id']);
  if (user) {
    return user;
  }

  let createdUser = userModel.createUserWithOutsideId(profile['id'],profile['displayName'],'Facebook',profile['id'],profile['id']);
  user = userModel.OUTSIDEfindById(profile['id']);
  if (user) {
    return user;
  }
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserByGithubIdOrCreate,
  getUserByTwitchIdOrCreate,
  getUserByImgurIdOrCreate,
  getUserByRedditIdOrCreate,
  getUserBySpotifyIdOrCreate,
  getUserByGoogleIdOrCreate,
  getUserByFacebookIdOrCreate
};
