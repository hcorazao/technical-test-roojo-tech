module.exports = (path) => {

  this.getFlights = (req, res) => {
    setTimeout(() => {
      return res.sendFile(path.resolve('mocks/user/flights.json'));
    }, 1000)
  }

  this.getTickets = (req, res) => {
    let userDocumentId = req.body.userDocumentId;
    setTimeout(() => {
      return res.sendFile(path.resolve('mocks/user/tickets.json'));
    }, 1000)
  }

  this.bookTicket = (req, res) => {
    let user = req.body.user;
    let flightId = req.body.flightId;
    setTimeout(() => {
      return res.sendFile(path.resolve('mocks/user/ticket-confirmation.json'));           // Ubigeo Validation
    }, 1000)
  }

  this.findFlight = (req, res) => {
    let flightId = req.body.flightId;
    setTimeout(() => {
      return res.sendFile(path.resolve('mocks/user/find-flight.json'));           // Ubigeo Validation
    }, 1000)
  }

  return this;
}
