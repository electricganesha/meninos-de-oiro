var mongoose = require('mongoose');

var MemberSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    telephone: String,
    address: String,
    birthDate: {type: Date, default:Date.now},
    subscribedToNewsLetter: Boolean
  });

  mongoose.model('Members', MemberSchema);
