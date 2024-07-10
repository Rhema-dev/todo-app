const mongoose = require('mongoose');
require ('dotenv').config();

const DB = process.env.DB_URI

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('Database connected')
})

module.exports = mongoose.connection; 