const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try{
    //build query
    const queryObj = {...req.query};
    const exludedFields = ['page', 'sort', 'limit', 'fields'];
    exludedFields.forEach(el => delete queryObj[el]);

    console.log(queryObj);
    const query =  Tour.find(queryObj);
    //execute query
    const tours = await query;
    // const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');
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

