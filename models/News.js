var mongoose = require('mongoose');

var NewsSchema = new mongoose.Schema(
  {
    category: String,
    title: String,
    link: String,
    upvotes: {type: Number, default:0},
    body: String,
    imageLink: String,
    date: {type: Date, default:Date.now},
    imageLink: String,
    text: String,
  });

  NewsSchema.methods.upvote = function(cb) {
    this.upvotes += 1;
    this.save(cb);
  };

  mongoose.model('News', NewsSchema);
