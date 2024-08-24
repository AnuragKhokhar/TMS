const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors')
const userRoute = require('./routes/userRoute');

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.URI).then(() => {
    console.log("connected successfully");

    app.listen(process.env.PORT || 8000, '0.0.0.0', (error) => {
        if (error) {
            console.error('Failed to start server:', error);
        } else {
            console.log(`Server is running on http://0.0.0.0:${process.env.PORT || 8000}`);
        }
    });
    

}).catch((error) => {
    console.error('error', error)
})


app.use('/api/user', userRoute);
