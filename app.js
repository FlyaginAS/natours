const express = require('express');
const fs = require('fs');
const util = require('util');

const app = express();
app.use(express.json());
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
/*
* api/v1/articles
* api/v1/articles/
*
*
* */
//READ
app.get('/api/v1/articles', async (req, res)=>{
    const articles = JSON.parse(await  readFile(`${__dirname}/data/articles.json`, 'utf-8'));
    res.status(200).json({
        status: 'success',
        results: articles.length,
        data: {
            articles
        }
    });
});
//CREATE
app.post('/api/v1/articles', async (req, res)=>{
    const article = req.body;
    const articles = JSON.parse(await  readFile(`${__dirname}/data/articles.json`, 'utf-8'));
    articles.push(article);
    await  writeFile(`${__dirname}/data/articles.json`, JSON.stringify(articles));
    res.status(201).json({
        status: 'success post',
        data: null
    });
});
//UPDATE
app.patch('/api/v1/articles/:title', async (req, res) =>{
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
});
//DELETE

const port = 3000;
app.listen(port, ()=>{
    console.log(`App listening port ${port}`);
});