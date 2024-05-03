const express = require("express");
const app = express();
const mainRouter = require("./mainRouter");
const secure = require("./private/secure");
secure(app);
app.use(express.json());

app.use("/", mainRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`${process.env.PORT || 5000}'s port online...`);
});
