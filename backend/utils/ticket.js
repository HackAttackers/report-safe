function ticketGenerator() {
  const length = 8;
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let ticket = "";
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * chars.length);
    ticket += chars[index];
  }

  return ticket;
}

module.exports = { ticketGenerator };
