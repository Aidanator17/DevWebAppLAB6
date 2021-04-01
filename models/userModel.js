const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role:'user',
    method: 'local',
    imageurl: null
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role:'user',
    method: 'local',
    imageurl: null
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role:'admin',
    method: 'local',
    imageurl: null
  },
  {
    id: 4,
    name: "Aidan Christopher",
    email: "aidan.r.christopher@gmail.com",
    password: "acit2520",
    role:'admin',
    method: 'local',
    imageurl: null
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
  OUTSIDEfindById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
  },
  createUserWithOutsideId: (u_id,u_name,u_url,u_method) => {
    database.push(
      {
        id:u_id,
        name:u_name,
        email:null,
        password:null,
        role:'admin',
        method:u_method,
        imageurl: u_url
      }
      )
  }
};



module.exports = { database, userModel };
