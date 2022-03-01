const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://admin:admin@cluster0.mtknb.mongodb.net/Refill?retryWrites=true&w=majority';

const connectDatabase = () => {
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Mongoose Connected");
        });
}

module.exports = connectDatabase;