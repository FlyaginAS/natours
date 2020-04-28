const express = require('express');
const fs = require('fs');
const util = require('util');
const morgan  = require('morgan');
const articleController = require('./controllers/articleController');
const userController = require('./controllers/userController');

const app = express();
app.use(express.json());
app.use((req, res, next)=>{
    console.log('hello from middleware');
    next();
});
app.use(morgan('dev'));
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
//controllers*************************************************************




//routers*******************************************************************
const articleRouter = express.Router();
const userRouter = express.Router();
userRouter
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);
app.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

articleRouter.route('/')
    .get(articleController.getAllArticles)
    .post(articleController.createArticle);
articleRouter.route('/:title')
    .get(articleController.getArticle)
    .patch(articleController.updateArticle)
    .delete(articleController.deleteArticle);

app.use('/api/v1/articles', articleRouter);
app.use('/api/v1/users', userRouter);

const port = 3000;
app.listen(port, ()=>{
    console.log(`App listening port ${port}`);
});