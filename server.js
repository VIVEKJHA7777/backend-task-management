const dotenv = require("dotenv");
const express = require('express');
const connectMongoDB = require('./db/connectMongoDB');
const authRoutes = require('./routes/auth.route');
const cookieParser = require('cookie-parser')
const app = express();

dotenv.config();


const PORT = process.env.PORT || 3000
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
})