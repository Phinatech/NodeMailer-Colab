const express = require("express");
const userRouter = require("./router");
const PORT = 2010;
const app = express();
require("./db");

// app.use(cors({ origin: "*" }));
app.set("view engine", "ejs");
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server Up",
  });
});

app.use("/api", userRouter);

app.listen(PORT, () => {
  console.log("Connected to PORT", PORT);
});
