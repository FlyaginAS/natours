const Tour = require('../models/tourModel');

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    // data: {
    //   tours,
    // }
  });
  console.log(req.time);
};
exports.getTour = (req, res) => {
  const id = +req.params.id;

  // const tour = tours[id];
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    }
  })
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
exports.updateTour = (req, res) => {
  res.status(201).send('tour was updated');
};
exports.deleteTour = (req, res) => {
  const { id } = +req.params;
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
