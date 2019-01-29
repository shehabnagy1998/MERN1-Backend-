const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      path = require('path'),
      api = require('./api'),

      app = express(),
      port = process.env.PORT || 8080,
      corsOption = {origin: '*', optionsSuccessStatus: 200};

// app.use(express.static(path.join(__dirname, '/dist/FrontEnd')));
app.use(express.static(path.join(__dirname, '/uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors(corsOption));
app.use('/api', api);

// app.get('*', (req, res)=> {
//   res.sendFile(path.join(__dirname, '/dist/Frontend/index.html'));
// });

const server = app.listen(port, (err)=> {console.log(`listen on port ${port}`)});
const io = require('socket.io')(server);
io.on('connection', (socket)=> {
    console.log('connected');
});