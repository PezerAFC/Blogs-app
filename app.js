const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')


//express app
const app = express();


//connect to mongodb
const dbURI = 'mongodb+srv://pezerafc:test123@blog-app.oygeg.mongodb.net/blog-app?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology:true})
    .then((result)=> app.listen(3000))
        .catch((err) => console.log(err));
//register view engine

app.set('view engine', 'ejs');


//middleware & static files(css,slike itd)
app.use(express.static('public'))
app.use(morgan('dev'))



//routing & html
app.get('/', (req,res) =>{
    res.redirect('/blogs');
    
    
    //res.sendFile('./views/index.html', {root: __dirname}); bez view engine
    //res.send('<p>home page</p>')
})

app.get('/about', (req,res) =>{
    res.render('about',{title: 'About'});
    //res.send('<p>about page</p>')
})


//blog routes
app.get('/blogs', (req,res)=>{
    Blog.find().sort({createdAt: -1})
        .then((result)=>{
            res.render('index', {title: 'All Blogs', blogs: result})
        })
        .catch(err=>{
            console.log(err);
        })
})

app.get('/blogs/create', (req,res)=>{
    res.render('create', {title: 'Create'})
})

//redirects
// app.get('/about-us', (req,res) => {
    //     res.redirect('/about')
    // })
    
    
    //404 page
    app.use((req,res)=>{
        res.status(404).render('404', {title: '404'})
    })
    
    