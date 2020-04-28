const fs= require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

exports.checkId = async (req,res, next, value)=>{
    const title = value;
    const articles = JSON.parse(await  readFile(`${__dirname}/../data/articles.json`, 'utf-8'));
    let article= articles.find((item)=>{
        return item.title === title;
    });
    if(!article){
        return res.status(404).json({
            status: 'not found',
            message: 'check id',
        });
    }
    next();
};
exports.getAllArticles = async (req, res)=>{
    const articles = JSON.parse(await  readFile(`${__dirname}/../data/articles.json`, 'utf-8'));
    res.status(200).json({
        status: 'success',
        results: articles.length,
        data: {
            articles
        }
    })};
exports.getArticle = async (req, res) =>{
    const title = req.params.title;
    const articles = JSON.parse(await  readFile(`${__dirname}/../data/articles.json`, 'utf-8'));
    let article= articles.find((item)=>{
        return item.title === title;
    });
    console.log(article);
    res.status(200).json({
        status: 'success',
        data:{
            article
        }
    })
};
exports.createArticle = async (req, res)=>{
    const article = req.body;
    const articles = JSON.parse(await  readFile(`${__dirname}/../data/articles.json`, 'utf-8'));
    articles.push(article);
    await  writeFile(`${__dirname}/../data/articles.json`, JSON.stringify(articles));
    res.status(201).json({
        status: 'success post',
        data: null
    });
};
exports.updateArticle = async (req, res) =>{
    const title = req.params.title;
    const body= req.body;
    const articles = JSON.parse(await  readFile(`${__dirname}/../data/articles.json`, 'utf-8'));
    let article= articles.find((item, index, arr)=>{
        return item.title === title;
    });
    const index= articles.indexOf(article);
    let newArticle = {...article, ...body};
    articles.splice(index, 1, newArticle);
    await  writeFile(`${__dirname}/../data/articles.json`, JSON.stringify(articles));
    res.status(201).json({
        status: 'success',
        data:{
            newArticle
        }
    })
};
exports.deleteArticle =  async(req, res)=>{
    const title = req.params.title;
    const articles = JSON.parse(await  readFile(`${__dirname}/../data/articles.json`, 'utf-8'));
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
        await  writeFile(`${__dirname}/../data/articles.json`, JSON.stringify(articles));
        res.status(204).json({
            status: 'success',
            data: null,
        });
    }
};