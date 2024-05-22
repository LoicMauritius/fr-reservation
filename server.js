const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));