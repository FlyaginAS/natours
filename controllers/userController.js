const fs= require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

exports.getUser = (req, res)=>{
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined',
    })
};
exports.getAllUsers = (req, res)=>{
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined',
    })
};
exports.createUser = (req, res)=>{
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined',
    })
};
exports.updateUser = (req, res)=>{
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined',
    })
};
exports.deleteUser = (req, res)=>{
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined',
    })
};