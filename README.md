# train-ticket
Train Ticket Reservation System

FrontEnd : HTML, CSS, JavaScript </br>
BackEnd : NodeJs, ExpressJs, MongoDB </br>

<b> Database Model </b></br>

<b> Seats Collection:</b></br>
  seatNumber: { type: Number, required: true },</br>
  rowNumber: { type: Number, required: true },</br>
  status: { type: String, enum: ['available', 'booked'], default: 'available' }</br>
  
<b>Routes</b></br>
app.get("/") => Send Index.html to browser</br>
app.get("/allSeats") => Get all seats and their status</br>
app.post("/reserve") => Book seats and checking is seats are available then booked and update their status</br>
app.post("/reset") => Make all seats are to available</br></br></br></br>

![seats](https://user-images.githubusercontent.com/110186112/235284946-589d9085-a9e6-4010-a5e6-1e35c85e659c.PNG)

