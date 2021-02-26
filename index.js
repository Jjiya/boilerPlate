const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://root:1234@boilerplate.6vxxl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('mongoDB Connected...'))
  .catch(err => console.log(err))


/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://root:1234@boilerplate.6vxxl.mongodb.net/boilerPlate?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/

  app.get('/', (req, res) => {
  res.send('Hello World! Hello Node.js (●ˇ∀ˇ●)')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})