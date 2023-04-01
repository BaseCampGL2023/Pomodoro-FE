const express = require("express");

const app = express();

app.use("/", express.static("./dist/pomodoro"));

app.listen(80, () => console.log("Server running on port 80"));