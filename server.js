const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyparser = require('body-parser');
app.use(bodyparser.json());

const PORT = process.env.PORT || 3000;
// const Person = require('./models/Person');

 app.get('/', function (req, res) {
  res.send('Welcome to my hotel. ')
 })

 // IMPORT the router files
 const personRoutes = require('./routes/personRoutes');
 const menuItemRoutes = require('./routes/menuItemRoutes');

 app.use('/person', personRoutes);
 app.use('/menu', menuItemRoutes);

 
app.listen(PORT, ()=>{
    console.log("Active on 3000.")
})