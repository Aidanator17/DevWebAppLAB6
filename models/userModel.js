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
  createUserWithOutsideId: async (u_id, u_name, u_url, u_method) => {
    let name = u_name
    let email = 'null'
    let password = 'null'
    let method = u_method
    let imageURL = u_url
    let id = u_id
    try {
    const user = await prisma.user.create({
      data: { id,name, email, password, imageURL, method }
    });
    res.redirect('/auth/login')
  } catch (err) { 
    return res.status(400).json(err)
    
  }
  }
};



module.exports = { database, userModel };
