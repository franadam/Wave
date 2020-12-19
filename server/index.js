require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is on port ${port} ! `);
});
