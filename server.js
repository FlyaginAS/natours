const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app = require('./app');

const DB_URL = process.env.DB_URL.replace(
  '<password>',
  process.env.DB_PASSWORD
);
mongoose
  .connect(DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
})
  .then((con) => {
    // console.log(con.connections);
    console.log('DB connection successful');
  });

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Article must have a title'],
    unique: true,
  },
  data: Number,
  text: String,
});
const Article = mongoose.model('Article', articleSchema);
const testArticle = new Article({
  title: 'Helsinki',
  data: 2020,
  text: 'how i live in helsinki',
});
testArticle
  .save()
  .then((doc)=>{
    console.log(doc);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening port ${port}`);
});
