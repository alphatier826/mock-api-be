require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routing");

const app = express();

// Enable CORS
app.use(cors({
  origin: "*", // allow all origins (for testing)
}));



app.use(express.json());



app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Service up and running"
  });
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
