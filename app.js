require('dotenv').config()
const express = require('express');
const { urlencoded, json } = require('body-parser');
const path = require('path');
const router = require('./routes/router');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const app = express();

const mongoDb = process.env.DB_KEY;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
            if (!user) return done(null, false, { msg: "Incorrect username" });
    
            const passwordMatches = await bcrypt.compare(password, user.password);
            if (passwordMatches) {
                return done(null, user);
            } else {
                return done(null, false, { msg: "Incorrect password" });
            }
        } catch (e) {
            done(e);
        }
    })
);;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(urlencoded({ extended: true }));
app.use(json());

app.use('/', router);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => console.log('Server running'));