const express = require('express');
const morgan = require('morgan');

//express app
const app = express();

//register view engine

app.set('view engine', 'ejs');


//listen for requests
app.listen(3000);


//middleware & static files(css,slike itd)
app.use(express.static('public')) /

app.use(morgan('dev'))


//routing & html
app.get('/', (req,res) =>{
const blogs = [
    {title: 'First blog title', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Second blog title', snippet: 'Nulla vero ullam reiciendis dicta sequi'},
    {title: 'Third blog title', snippet: 'quaerat impedit sit laudantium voluptatem'}
];

    res.render('index', {title: 'Home', blogs}); //view engine treba za dynamic data(html je u ejs dokumentu)
    
    
    //res.sendFile('./views/index.html', {root: __dirname}); bez view engine
    //res.send('<p>home page</p>')
})

app.get('/about', (req,res) =>{
    res.render('about',{title: 'About'});
    //res.send('<p>about page</p>')
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