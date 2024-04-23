const express = require("express");
const app = express();
const cors = require("cors");
const mainRouter = require("./mainRouter");

app.use(cors());
app.use(express.json());

app.use("/api", mainRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`${process.env.PORT || 5000}'s port online...`);
});
