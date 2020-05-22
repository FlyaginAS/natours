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
exports.createTour = (req, res) => {
  const newTour = req.body;
  res.send('Add new tour');
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
