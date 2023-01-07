// 載入框架、套件工具
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const Todo = require('./models/todo') // 載入todo model

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

// 樣板引擎 view engine
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// URL解析 (body Parser)
app.use(bodyParser.urlencoded({extended: true}))

// 路由設定
app.get('/', (req, res) => {
  // 取得todo 資料 
  Todo.find() // 取出 Todo model 裡的所有資料，括號內可帶搜尋條件的參數
  .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
  .then(todos => res.render('index', { todos: todos }))// 將資料傳給 index 樣板
  .catch(error => console.error(error)) //錯誤處理
})

app.get('/todos/create', (req, res) => {
  res.render('create')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  return Todo.create({ name })
    .then(() => {res.redirect('/')})
    .catch(error => console.log(error))
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})


// 伺服器監聽
app.listen(port, () => {
  console.log(`Server is running on http:localhost: ${port}`)
})