const app = require('./app.js');
const cors = require('cors');
const hostname = '0.0.0.0'; // Bind to all interfaces
const port = 8090;

// Configure CORS to allow requests from both localhost and 127.0.0.1
app.use(cors({
  origin: ['http://localhost:8090', 'http://127.0.0.1:8090'],
  credentials: true
}));

app.listen(port, hostname, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Server also accessible at http://127.0.0.1:${port}`);
});
