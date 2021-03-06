const mongoose = require('mongoose')
const Schema   = mongoose.Schema 
      
const articleSchema = new Schema({
    title  : String,
    content: String,
    comment : [{
      type: Schema.Types.ObjectId, ref: 'User',
      msgComment : String
    }]
  }, { timestamps: true })      

module.exports = mongoose.model('Article',articleSchema);


