var mongoose = require('mongoose');

var StatsSchema = new mongoose.Schema(
  {
    description: String,
    number: String,
    imagePath: String,
    date: {type: Date, default:Date.now},
  });

  mongoose.model('Stats', StatsSchema);
