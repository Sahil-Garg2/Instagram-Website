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
app.use("/",'./routes/user.routes');
app.use("/",'./routes/user1.routes');
app.use("/",'./routes/post.routes');
mongoose.connect(MONGOURI,{useNewUrlParser:true, useCreateIndex:true,useUnifiedTopology:true});
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
