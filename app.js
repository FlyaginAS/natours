const express = require('express');
const fs = require('fs');
const util = require('util');
const morgan  = require('morgan');

const app = express();
app.use(express.json());
app.use((req, res, next)=>{
    console.log('hello from middleware');
    next();
});
app.use(morgan('dev'));

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const getAllArticles = async (req, res)=>{
    const articles = JSON.parse(await  readFile(`${__dirname}/data/articles.json`, 'utf-8'));
    res.status(200).json({
        status: 'success',
        results: articles.length,
        data: {
            articles
        }
    })};
const getArticle = async (req, res) =>{
    const title = req.params.title;
    const body= req.body;
    const articles = JSON.parse(await  readFile(`${__dirname}/data/articles.json`, 'utf-8'));
    let article= articles.find((item, index, arr)=>{
        return item.title === title;
    });
    res.status(201).json({
        status: 'success',
        data:{
            article
        }
    })
};
const createArticle = async (req, res)=>{
    const article = req.body;
    const articles = JSON.parse(await  readFile(`${__dirname}/data/articles.json`, 'utf-8'));
    articles.push(article);
    await  writeFile(`${__dirname}/data/articles.json`, JSON.stringify(articles));
    res.status(201).json({
        status: 'success post',
        data: null
    });
};
const updateArticle = async (req, res) =>{
    const title = req.params.title;
    const body= req.body;
    const articles = JSON.parse(await  readFile(`${__dirname}/data/articles.json`, 'utf-8'));
    let article= articles.find((item, index, arr)=>{
        return item.title === title;
    });
    const index= articles.indexOf(article);
    let newArticle = {...article, ...body};
    articles.splice(index, 1, newArticle);
    await  writeFile(`${__dirname}/data/articles.json`, JSON.stringify(articles));
    res.status(201).json({
        status: 'success',
        data:{
            newArticle
        }
    })
};
const deleteArticle =  async(req, res)=>{
    const title = req.params.title;
    const articles = JSON.parse(await  readFile(`${__dirname}/data/articles.json`, 'utf-8'));
    let index= articles.findIndex((item, index, arr)=>{
        return item.title === title;
    });
    if(index === undefined) {
        res.status(404).json({
            status: 'fail',
            message: 'not found title',
        });
    } else {
        articles.splice(index, 1);
        await  writeFile(`${__dirname}/data/articles.json`, JSON.stringify(articles));
        res.status(204).json({
            status: 'success',
            data: null,
        });
    }
};

app.route('/api/v1/articles')
    .get(getAllArticles)
    .post(createArticle);
app.route('/api/v1/articles/:title')
    .get(getArticle)
    .patch(updateArticle)
    .delete(deleteArticle);

const port = 3000;
app.listen(port, ()=>{
    console.log(`App listening port ${port}`);
});