// We will need our mongoose library
const mongoose = require(`mongoose`);

// Our schema
const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true // we will require a title for our blog
  },
  content: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['DRAFT', 'PUBLISHED'],
    default: 'DRAFT'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  }
}, {
  timestamps: true // we want timestamps to keep track of when our blogs were created
});

// Query Helper
// A helper that will return all blogs with the status of draft
BlogSchema.query.drafts = function () {
  return this.where({
    status: 'DRAFT'
  });
};

// A helper that will return all blogs with the status of published
BlogSchema.query.published = function () {
  return this.where({
    status: 'PUBLISHED'
  });
};

// Exporting our blog model
module.exports = mongoose.model('Blog', BlogSchema);