// 載入框架、套件工具
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const todo = require('./models/todo')

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

//view engine
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


// 路由設定
app.get('/', (req, res) => {
  // 取得todo 資料 
  todo.find() // 取出 Todo model 裡的所有資料，括號內可帶搜尋條件的參數
  .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
  .then(todos => res.render('index', { todos: todos }))// 將資料傳給 index 樣板
  .catch(error => console.error(error)) //錯誤處理
  

})

// 伺服器監聽
app.listen(port, () => {
  console.log(`Server is running on http:localhost: ${port}`)
})