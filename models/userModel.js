const express = require("express");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const request = require('request');

let database = []
request('https://aidansproject.herokuapp.com/database/users', function (error, response, body) {
  console.log("BODY:",JSON.parse(body))
  database.push(JSON.parse(body))
  })

const userModel = {
  findOne: (email) => {
    console.log("DATABASE:",database[0])
    const user = database[0].find((user) => user.email === email);
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
    database[0].push(
      {
        id: u_id,
        name: u_name,
        email: null,
        password: null,
        role: 'superadmin',
        method: u_method,
        imageurl: u_url
      }
    )
  }
};



module.exports = { database, userModel };
