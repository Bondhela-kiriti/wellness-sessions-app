const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();



const authRoutes = require("./Routes/authRoutes.js")
const sessionRoutes = require("./Routes/sessionRoutes.js")

const app = express();
app.use(cors());
app.use(express.json());

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);


mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, () => {
    console.log("Server is running on port 5000");
  });
  
})
.catch((err) => {
  console.log("Error connecting to MongoDB", err);
})

  