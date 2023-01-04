// 載入框架、套件工具
const express = require('express')
const mongoose = require('mongoose')

// 表示僅在非正式環境使用dotenv
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

// 宣告
const port = 3000
const app = express()


// 資料庫連線字串
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.once('open', () => {
  console.log('mongodb connected!')
})

db.on('error', () => {
  console.log('mongodb error!')
})


// 路由設定
app.get('/', (req, res) => {
  res.send('hello world!')
})

// 伺服器監聽
app.listen(port, () => {
  console.log(`Server is running on http:localhost: ${port}`)
})