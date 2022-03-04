const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const errorMiddleware = require('./middlewares/error');
var cors = require('cors')

const app = express();


// config
require('dotenv').config({ path: './.env' });

// if (process.env.NODE_ENV === 'production') {
//     console.log(process.env.MONGO_URI);

// }
// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config({ path: './config/config.env' });
//     console.log(process.env.MONGO_URI);
// }

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());

const user = require('./routes/userRoute');
const product = require('./routes/productRoute');

app.use('/api/v1', user);
app.use('/api/v1', product);

// deployment
__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    });
} else {
    app.get('/', (req, res) => {
        res.send('Server is Running! 🚀');
    });
}

// error middleware
app.use(errorMiddleware);

module.exports = app;