const express = require('express');
const app = express();
const PORT = 5000;
const mongoose=require('mongoose');
const cors = require('cors');
app.use(cors());
const {MONGOURI} = require('./keys');
//Sahil@1234
require('./models/user.model')
app.use(express.json());
console.log("server");
app.use(require('./routes/user.routes'));
app.use(require('./routes/post.routes'));
app.use(require('./routes/user1.routes'));
mongoose.connect(MONGOURI,{useNewUrlParser:true, useCreateIndex:true,useUnifiedTopology:true, useFindAndModify: false });
const connection=mongoose.connection;
connection.once('open',()=>{
console.log('database successfully connected');
})

connection.once('error',()=>{
	console.log('An error occured');
})

app.listen(PORT,()=>{
	console.log('server is running at PORT 5000');
})
