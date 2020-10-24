const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/post/Post')

//Config

 //template Engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

    //Body-Parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

//Routes

app.get('/', (req, res)=> {
    res.render('./home/home')
})
app.get('/sendPost', (req, res)=>{
    res.render('./form/form')
})

app.get('/posts', (req, res)=>{
    Post.findAll().then((posts)=>{
        res.render('./posts/post', {posts: posts})
    })
})


app.post('/add', (req, res)=>{
    Post.create({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    }).then(()=>{
        res.redirect('/posts')
    }).catch((err)=>{
        res.send('Ouve um erro '+ err)
    })
})

app.get('/del-post/:id', (req, res)=>{
    Post.destroy({
        where: {'id': req.params.id}
    }).then(()=>{
        res.redirect('/posts')
    }).catch((err)=>{
        res.send('an error has occurred: '+ err)
    })
})

app.listen(8081,()=>{
    console.log('Servidor Iniciado em http://localhost:8081')
})