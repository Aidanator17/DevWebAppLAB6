const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role:'user',
    method: 'local'
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role:'user',
    method: 'local'
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role:'admin',
    method: 'local'
  },
  {
    id: 4,
    name: "Aidan Christopher",
    email: "aidan.r.christopher@gmail.com",
    password: "acit2520",
    role:'admin',
    method: 'local'
  },
];

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
  GITfindById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
  },
  createUserWithGithubId: (u_id,u_name,u_method) => {
    database.push(
      {
        id:u_id,
        name:u_name,
        email:null,
        password:null,
        role:'admin',
        method:u_method
      }
      )
  }
};



module.exports = { database, userModel };
