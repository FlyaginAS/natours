const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try{
    //build query
    //1a)filtering*****************************************************************************
    const queryObj = {...req.query};
    const exludedFields = ['page', 'sort', 'limit', 'fields'];
    exludedFields.forEach(el => delete queryObj[el]);
    //1b)advanced filtering***************************************************************
    let queryStr = JSON.stringify(queryObj);
    queryStr =  queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);

    let query =  Tour.find(JSON.parse(queryStr));
    //2)sorting*******************************************************************
    if(req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    //3)limiting******************************************************************
    if(req.query.fields){
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    }
    //execute query
    const tours = await query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (e) {
    res.status(404).json({
      status: 'fail',
      message: e,
    });
  }
};
exports.getTour = async (req, res) => {
  try{
    const id = req.params.id;
    const tour = await Tour.findById(id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      }
    })
  } catch (e) {
    res.status(404).json({
      status: 'fail',
      message: e,
    });
  }

};
exports.createTour = async (req, res) => {
  try{
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.updateTour = async (req, res) => {
  try{
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.deleteTour = async (req, res) => {
  try{
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

