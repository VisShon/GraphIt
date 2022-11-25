const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_DB_URL, {
             useNewUrlParser: true,
             useUnifiedTopology: true,
         });
        console.log(`MongoDB Connection Succeeded.${connect.connection.host}`);
    }
    catch (err) {
        console.log('Error in DB connection: ' + error)
    }
};

module.exports = connectDB;