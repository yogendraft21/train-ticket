const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Seat schema
const seatSchema = new Schema({
  seatNumber: { type: Number, required: true },
  rowNumber: { type: Number, required: true },
  status: { type: String, enum: ['available', 'booked'], default: 'available' }
});

// Create the Seat model and export it
const Seat = mongoose.model('Seat', seatSchema);
module.exports = Seat;

// // Store all seats in the database
// const seats = new Array(80).fill().map((_, i) => ({ seatNumber: i + 1, rowNumber: Math.floor(i/7) + 1 }));
// Seat.insertMany(seats)
//   .then(() => console.log('Seats stored in database'))
//   .catch(err => console.error(err));
