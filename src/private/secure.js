const cors = require("cors");
const allowedOrigins = [
  "https://math-mind-solver.netlify.app",
  "https://math-vozv.onrender.com",
];

module.exports = (app) => {
  // app.use(
  //   cors({
  //     origin: allowedOrigins,
  //     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  //     methods: ["GET", "POST"],
  //     allowedHeaders: ["Content-Type", "Authorization"],
  //     credentials: true,
  //   })
  // );

  app.use(
    cors({
      origin: function (origin, callback) {
        // Check if the origin is in the allowed origins array or if it's undefined (which happens for same-origin requests)
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
};
