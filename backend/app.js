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
    getFlights: `${apiEndpointBase}admin/get-flights`,
    getTickets: `${apiEndpointBase}admin/get-tickets`,
    bookTicket: `${apiEndpointBase}admin/book-ticket`
  }
};

// Controllers
const adminController = require('./controllers/admin.controller')(path);

// Endpoints
app.get(app.locals.routes.getFlights, adminController.getFlights);
app.post(app.locals.routes.getTickets, adminController.getTickets);
app.post(app.locals.routes.bookTicket, adminController.bookTicket);


app.listen(9009, () => {
  console.log('Server ready on port 9009');
});
