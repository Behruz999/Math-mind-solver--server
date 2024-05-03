const express = require("express");
const app = express();
const mainRouter = require("./mainRouter");
const secure = require('./private/secure')
secure(app)
app.use(express.json());

app.use("/api", mainRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`${process.env.PORT || 5000}'s port online...`);
});
