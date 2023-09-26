const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const routes = require('./src/routes/routes');
const bodyParser = require('body-parser');
const multer = require('multer');
app.use(bodyParser.json()); 
app.use(cors());
app.use(multer().none());


app.use((req, res, next) => {
  // console.log('Request received:', req.method, req.url);
  next(); // Call the next middleware/route handler
});

// Mount the routes on the app
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
