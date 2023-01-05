const mongoose = require('mongoose')
const Todo = require('../todo') //載入 todo model
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.once('open', () => {
  console.log('mongodb connected')
  for(let i = 0; i < 10; i++){
    // 新增資料
    Todo.create({name: `name-${i}`})
  }
})

db.on('error', () => {
  console.log('connect error')
})
