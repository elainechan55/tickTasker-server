const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  // type: {
  //   type: String,
  //   required: true
  // },
  description: {
    type: String,
    required: true
  },
  isComplete: {
    type: Boolean,
    required: true
  },
  // createDate: {
  //   type: Date,
  //   required: true
  // },
  // deadline: {
  //   type: Date
  //   // required: true
  // },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Task', taskSchema)
