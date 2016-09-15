var mongoose = require('mongoose');

var TeamSchema = new mongoose.Schema(
  {
    name: String,
    position: String,
    imagePath: String,
    date: {type: Date, default:Date.now},
  });

  mongoose.model('Team', TeamSchema);
