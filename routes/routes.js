const express = require("express");
const routes = express.Router();
 const controller = require('../controller.js/controller') 

routes.post('/login', controller.register); 
// routes.post('/login', loginAdmin, controller.login); 






module.exports = routes
