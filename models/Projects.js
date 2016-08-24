var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    imagePath: String,
    date: {type: Date, default:Date.now},
  });

  mongoose.model('Projects', ProjectSchema);
