var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema(
  {
    name: String,
    color: String,
    icon: String,
  });

  mongoose.model('Categories', CategorySchema);
