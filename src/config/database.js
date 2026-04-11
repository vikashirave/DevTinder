const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect("mongodb+srv://vikashirave:2EHavIuY5DHgn5Vh@namastenode.qplbzpk.mongodb.net/devTinder");
}

module.exports = connectDB;