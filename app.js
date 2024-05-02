const express = require('express');
const cors = require('cors');
const pool = require('./src/config/database');
const authRouter = require('./src/api/auth');
const favoritesRouter = require('./src/api/favorites');
const articlesRouter = require('./src/api/articles');
const teamComparisonRouter = require('./src/api/team_comparisons');
const playersComparisonRouter = require('./src/api/players_comparisons');

const app = express();

// Configure CORS properly
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'https://main--prowlingpooles.netlify.app',
    ];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/favorites', favoritesRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/team_comparisons', teamComparisonRouter);
app.use('/api/players_comparisons', playersComparisonRouter);

app.use((req, res, next) => {
  console.log(
    `Incoming request: ${req.method} ${req.path} from ${req.headers.origin}`
  );
  next();
});

// Test route
app.get('/test', (req, res) => {
  res.send('Test route working');
});

// Start the server and handle database connection
pool
  .query('SELECT 1 + 1 AS result')
  .then((result) =>
    console.log('Database connection successful', result.rows[0].result)
  )
  .catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
  });

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // console.log('Database password:', process.env.DB_PASSWORD);
});

//  404 handler
app.use((req, res) => res.status(404).send('Route does not exist.'));

//  Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server error');
});
