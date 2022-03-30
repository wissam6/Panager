const express = require('express');
const morgan = require('morgan');
//var mysql = require('mysql');
const _ = require('lodash');
//var popup = require('popups');
const alert = require('alert');
const session = require('express-session')
const bcrypt = require('bcrypt');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

//create connection
const db = require('./models');

//routers
const router = require('./routes/passwordRoute.js');
app.use('/api/passwords', router);

//association
//user
db.user.hasMany(db.password);

//password
db.password.belongsTo(db.user);

db.sequelize.sync().then((req)=>{
  app.listen(3000);
})

const {user} = require('./models');
const {password} = require('./models');
const { isEmpty } = require('lodash');


app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))




app.get('/', (req,res) => {
    res.render('index');
});

app.get('/signin', (req,res)=>{
  res.render('sign-in')
});

/*user.create({
    firstname: "Wissam",
   }).catch(err=>{
    console.log(err);
   });
   */

//login authentication
app.post('/signin', (req,res) => {
  user.findOne({
    where: {
      email: req.body.useremail,
      password: req.body.userpassword,
    }
    //attributes: ['id', '']
  }).then(function(result) {
    if(result!=null) {  //login success
      //alert("welcome");
      sessionData = req.session;
      sessionData.user = {};
      sessionData.user.id = result.id;
      sessionData.user.username = result.username;
      sessionData.user.useremail = result.useremail;
      sessionData.user.createdAt = result.createdAt;
      sessionData.user.updatedAt = result.updatedAt;
      //res.redirect("/");
      res.render('profile');
    }
    else alert("Invalid username of password");  //a hacker shouldn't know if the email OR password is invalid
  });
  
  
  

  
/*
  //check if the email is taken
  user.findOne({
    where: {
      //email: req.useremail
    }
  }).then(function(result) {
    console.log(result);
  });
  */
});



//insert into users table
app.post('/signup', (req,res)=>{
    user.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
  
  
});

app.get('/profile', (req,res)=>{
  if(sessionData.user) {
    res.render('profile');
  }
});

app.get('/logout', (req,res)=> {
  sessionDate = req.session;
  sessionData.destroy(function(err) {
    if(err){
        msg = 'Error destroying session';
        res.json(msg);
    }else{
        msg = 'Session destroy successfully';
        console.log(msg)
        res.json(msg);
    }
  });
});

app.get('/passwords', (req,res) => {
  res.render('passwords');
});

app.post('api/passwords/addPassword', (req,res) => {
  res.send(req.body);
  //res.render('passwords');
});



// 404 page
app.use((req,res)=>{
    res.status(404).render('404');
});

