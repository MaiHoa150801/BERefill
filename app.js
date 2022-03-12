const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const errorMiddleware = require('./middlewares/error');
var cors = require('cors');

const app = express();

// config
require('dotenv').config({ path: './.env' });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());

const user = require('./routes/userRoute');
const product = require('./routes/productRoute');
const salesperson = require('./routes/salespersonRoute');
const voucher = require('./routes/voucherRoute');
const order = require('./routes/orderRoute');
app.use('/api/v1', user);
app.use('/api/v1', product);
app.use('/api/v1', salesperson);
app.use('/api/v1', voucher);
app.use('/api/v1', order);
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.send('Server is Running! ');
});
app.use(errorMiddleware);

module.exports = app;
