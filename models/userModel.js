const express = require("express");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const request = require('request');
let sites = ['https://aidansproject.herokuapp.com','http://localhost:8000']

var database = []
request(sites[0]+'/database/users', function (error, response, body) {
  database.push(JSON.parse(body))
})

const userModel = {
  findOne: (email) => {
    request(sites[0]+'/database/users', function (error, response, body) {
  database[0] = JSON.parse(body)
})
    console.log("DATABASE:",database)
    const user = database[0].find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    request(sites[0]+'/database/users', function (error, response, body) {
  database[0] = JSON.parse(body)
})
    const user = database[0].find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  OUTSIDEfindById: (id) => {
    request(sites[0]+'/database/users', function (error, response, body) {
  database[0] = JSON.parse(body)
})
    const user = database[0].find((user) => user.id === id);
    if (user) {
      return user;
    }
  },
  createUserWithOutsideId: async (u_id, u_name, u_url, u_method, u_email, u_password) => {
    let name = u_name
    let email = u_email
    let password = u_password
    let method = u_method
    let imageURL = u_url
    let id = u_id
    try {
    const user = await prisma.user.create({
      data: { id,name, email, password, imageURL, method }
    });
    res.redirect('/auth/login')
  } catch (err) { 
    console.log('ERROR CODE:',err)
    
  }
  }
};



module.exports = { database, userModel };
