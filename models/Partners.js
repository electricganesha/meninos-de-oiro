var mongoose = require('mongoose');

var PartnerSchema = new mongoose.Schema(
  {
    name: String,
    iconPath: String,
    link: String,
    date: {type: Date, default:Date.now},
  });

  mongoose.model('Partners', PartnerSchema);
