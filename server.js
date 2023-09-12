const app = require('./app.js');
const cors = require('cors');
const hostname = '127.0.0.1';
const port = 8090;

// Use the cors middleware
app.use(cors());
app.listen(port, hostname);
