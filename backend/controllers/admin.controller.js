module.exports = (path) => {

  this.getFlights = (req, res) => {
    setTimeout(() => {
      return res.sendFile(path.resolve('backend/mocks/admin/flights.json'));
    }, 1000)
  }

  this.getTickets = (req, res) => {
    let userDocumentId = req.body.userDocumentId;
    setTimeout(() => {
      return res.sendFile(path.resolve('backend/mocks/admin/tickets.json'));
    }, 1000)
  }

  this.bookTicket = (req, res) => {
    let user = req.body.user;
    let flightId = req.body.flightId;
    setTimeout(() => {
      return res.sendFile(path.resolve('backend/mocks/admin/ticket-confirmation.json'));           // Ubigeo Validation
    }, 1000)
  }

  return this;
}
