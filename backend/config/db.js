const mongoose = require('mongoose');

const connectDB = async () => {
   const connect = await mongoose.connect(process.env.MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(response=>{
        console.log(`MongoDB Connection Succeeded.${connect.connection.host}`)
    }).catch(error=>{
        console.log('Error in DB connection: ' + error)
    });
};

module.exports = connectDB;