const mongoose = require('mongoose');

const {Schema} = mongoose;

const taskSchema = new Schema({
  text: String,
  date: String,
  cost: Number,
});

module.exports = Shop = mongoose.model('shops', taskSchema);