const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
// const cookieParser = require("cookie-parser");
dotenv.config();
const { equipmentRoutes /*, dummyRoutes2, dummyRoutes3 */ } = require("./routes");

const app = express();
// app.use(cookieParser());
app.use(express.json());
app.use(express.json({ limit: "10mb" })); // if you want to send images or files to the server you need to increase the limit
app.use(cors({ origin: true, credentials: true }));
app.use("/api", equipmentRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Equipment Rental and Sharing Microservice");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});