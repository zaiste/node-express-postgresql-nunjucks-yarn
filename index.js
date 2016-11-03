const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')

const app = express()
nunjucks.configure('views', {
  autoescape: true,
  express   : app
});


const widgets = require('./queries/widgets')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));

app.get('/', (req, res) => {
  res.render('index.html', { name: 'Zaiste'} )
})

app.get('/html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/calculate', (req, res) => {
  let { name, amount } = req.body || {};
  res.send(`I’ve got a POST with request body: ${name}, ${amount}`)
})

app.post('/api/widgets', widgets.create)
app.get('/api/widgets', widgets.retrieve)
app.get('/api/widgets/:id', widgets.retrieve)
app.put('/api/widgets/:id', widgets.update)
app.delete('/api/widgets/:id', widgets.remove);

app.listen(3000, () => {
  console.log('listening on 3000')
})
