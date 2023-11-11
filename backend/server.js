const express = require('express');
const routes = require('./routes/index')
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});