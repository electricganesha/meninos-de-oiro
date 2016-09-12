var mongoose = require('mongoose');

var StructuralInfoSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    date: {type: Date, default:Date.now},
    imageLink: String,
    text: String,
    tituloDoacao1: String,
    textoDoacao1: String,
    tituloDoacao2: String,
    textoDoacao2: String,
    tituloDoacao3: String,
    textoDoacao3: String,
    tituloDoacao4: String,
    textoDoacao4: String,
    textoPaypal: String,
    textoChamada: String,
    textoTransferencia: String,
    textoDoacao: String,
    financeLink: String
  });

  mongoose.model('StructuralInfo', StructuralInfoSchema);
