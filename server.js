const express = require('express');
const mongoose = require('mongoose');
const app = express();

const UserRouter = require('./backend/api/User');
const bodyParser = express.json;
const port = 3000;

app.use(bodyParser());
app.use('/user', UserRouter);

mongoose.connect("mongodb+srv://admin:1234@attendancedb.tfghbl2.mongodb.net/?retryWrites=true&w=majority&appName=AttendanceDB")
    .then(() => {
        console.log("Connected to Database!");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Connection Failed!", err);
    });
