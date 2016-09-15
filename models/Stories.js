var mongoose = require('mongoose');

var StorySchema = new mongoose.Schema(
  {
    title: String,
    text: String,
    videoLink: String,
    date: {type: Date, default:Date.now},
  });

  mongoose.model('Stories', StorySchema);
