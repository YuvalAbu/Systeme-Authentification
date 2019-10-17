require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const router = express.Router();
const environment = process.env.NODE_ENV;
const stage = require('./config')[environment];
const db = mongoose.connection;
const User = require('./models/usersSchema');

// Configuration du middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(
  session({
    secret: 'une phrase très très secrete',
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// Configuration de la connexion à la DB Mongo
mongoose.connect(`${process.env.MONGO_URL}`, {useNewUrlParser: true});
db.on('error', console.error.bind(console, 'ERREUR MONGODB:'));
db.once('open', () => console.log('MONGODB EST CONNECTE'));
mongoose.set('useCreateIndex', true);

// Configuration du système de connexion
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
passport.use(
  new LocalStrategy((email, password, done) => {
    if (email === 'admin' && email === 'admin') {
      User.find({}, function(err, users) {
        if (err) return done(null, false);
        return done(null, {email, users});
      });
    } else {
      User.find({email: email}, (err, user) => {
        if (err) return done(err);
        if (!user) {
          return done(null, false, {
            message: 'Utilisateur non trouvé',
          });
        }
        if (user) {
          if (!user[0].isVerified) {
            return done(null, false, {
              message: 'confirmer votre email',
            });
          }
          if (password === user[0].password && user[0]) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: 'Mauvais mot de passe',
            });
          }
        }
      });
    }
  }),
);

if (environment !== 'production') {
  app.use(logger('dev'));
}

// Configuration des routes
const routes = require('./routes/index.js');
// const AdminRoutes = require('./routes/admin/index.js')

app.use('/', routes(router));
// app.use('/admin', AdminRoutes(router));

// Start Server
app.listen(`${stage.port}`, () => {
  console.log(`Server now listening at localhost:${stage.port}`);
});

module.exports = app;
