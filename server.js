const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

mongoose
  .connect(
    "mongodb+srv://Raghu:Nimmana656@cluster0.qp7tesp.mongodb.net/skygoal",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const loginRouter = require("./routes/login");
const registerRouter = require("./routes/signup");
const userRouter = require("./routes/user");

const port = 4000;

app.use(express.json());

app.use("/login", loginRouter);
app.use("/signup", registerRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome to RAGHU!");
});

app.listen(port, () => {
  console.log(`Server Started on PORT ${port}`);
});
