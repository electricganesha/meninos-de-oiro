var mongoose = require('mongoose');

var StructuralInfoSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    date: {type: Date, default:Date.now},
    imageLink: String,
    text: String,
  });

  mongoose.model('StructuralInfo', StructuralInfoSchema);
