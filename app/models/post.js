const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: [true, 'Name is required'],
    match: [/[a-zA-Z]{3,}/, 'Don\'t match']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  }
});

module.exports = mongoose.model('Post', postSchema);
