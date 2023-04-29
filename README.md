# train-ticket
Train Ticket Reservation System

FrontEnd : HTML, CSS, JavaScript </br>
BackEnd : NodeJs, ExpressJs, MongoDB </br>

<b> Database Model </b>

<b> Seats Collection:</b>
  seatNumber: { type: Number, required: true },
  rowNumber: { type: Number, required: true },
  status: { type: String, enum: ['available', 'booked'], default: 'available' }
  
<b>Routes</b>
app.get("/") => Send Index.html to browser
app.get("/allSeats") => Get all seats and their status
app.post("/reserve") => Book seats and checking is seats are available then booked and update their status
app.post("/reset") => Make all seats are to available
![seats](https://user-images.githubusercontent.com/110186112/235284946-589d9085-a9e6-4010-a5e6-1e35c85e659c.PNG)

