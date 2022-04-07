const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
  text: String,
  date: Date,
  cost: Number,
});

module.exports = Shop = mongoose.model('shops', taskSchema);