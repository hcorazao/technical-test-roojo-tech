'use strict';

const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(morgan('dev'));

const apiEndpointBase = '/api/';

// Routes
app.locals = {
  routes: {
    getFlights: `${apiEndpointBase}user/get-flights`,
    findFlight: `${apiEndpointBase}user/find-flight`,
    getTickets: `${apiEndpointBase}user/get-tickets`,
    bookTicket: `${apiEndpointBase}user/book-ticket`
  }
};

// Controllers
const userController = require('./controllers/user.controller')(path);

// Endpoints
app.get(app.locals.routes.getFlights, userController.getFlights);
app.post(app.locals.routes.findFlight, userController.findFlight);
app.post(app.locals.routes.getTickets, userController.getTickets);
app.post(app.locals.routes.bookTicket, userController.bookTicket);


app.listen(9009, () => {
  console.log('Server ready on port 9009');
});
