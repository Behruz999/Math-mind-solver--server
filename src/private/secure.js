const cors = require('cors');
const allowedOrigins = [
    'https://math-mind-solver.netlify.app/api',
    'https://math-vozv.onrender.com'
];

module.exports = (app) => {
    app.use(cors({
        origin: allowedOrigins,
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }));
}