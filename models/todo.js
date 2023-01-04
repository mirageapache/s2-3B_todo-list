const mongoose = require('mongoose')
const Schema = mongoose.Schema()

// 建立資料結構
const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  done: {
    type: Boolean
  }
})

// 匯出todo schema
module.exports = mongoose.model('Todo', todoSchema)