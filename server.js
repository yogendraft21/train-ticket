const express = require("express");
const mongoose = require("mongoose");
const Seat = require("./models/Seats.model");
require('dotenv').config()
const app = express();
app.use(express.json());

// Serve static files from public directory
app.use(express.static(__dirname + "/public"));

// Serve index.html on root URL
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Connect to MongoDB database
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error(err));

// Function to check if the required number of seats are available in one row
async function checkAvailability(numSeats) {
  const seats = await Seat.find();
  let count = 0;
  let startSeat = -1;
  for (let i = 0; i < seats.length; i++) {
    if (seats[i].status === "available") {
      if (count === 0) {
        startSeat = i;
      }
      count++;
    } else {
      count = 0;
      startSeat = -1;
    }

    if (count === numSeats) {
      return startSeat;
    }
  }

  return -1;
}

// Function to reserve seats
async function reserveSeats(numSeats) {
  const seats = await Seat.find();
  const startSeat = await checkAvailability(numSeats);

  if (startSeat !== -1) {
    for (let i = startSeat; i < startSeat + numSeats; i++) {
      await Seat.findOneAndUpdate(
        { seatNumber: seats[i].seatNumber },
        { status: "booked" }
      );
    }
    return {
      success: true,
      seats: Array.from(
        Array(numSeats),
        (_, i) => seats[startSeat + i].seatNumber
      ),
    };
  } else {
    return {
      success: false,
      seats: [],
    };
  }
}


// get All the Seats data
app.get("/allSeats",async(req,res)=>{
    const seats = await Seat.find();
    res.send(seats);
})
// Reserve seats endpoint
app.post('/reserve', async (req, res) => {
  const { numSeats } = req.body;
  console.log(numSeats);
  try {
    const result = await reserveSeats(numSeats);
    if (result.success) {
      res.json({ success: true, seats: result.seats });
    } else {
      res.json({ success: false, message: `No seats available for ${numSeats} persons` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post('/reset', async (req, res) => {
  try {
    // Set all seats to available
    await Seat.updateMany({}, { status: 'available' });
    res.send({ success: true, message: 'All seats reset to available' });
  } catch (error) {
    console.error(error);
    res.send({ success: false, message: 'Error resetting seats' });
  }
});


// Start the server
app.listen(8081, () => {
  console.log("Server is running on port 8080");
});
