const tours = require('../tours');

exports.checkID = (req, res, next, val)=>{
    const id = val;
    if(id > tours.length-1 || id < 0){
        return res.status(404).json({
            status: 'not found',
            data: null,
        })
    }
    next();
};
exports.getAllTours = (req, res)=>{
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours,
        }
    });
    console.log(req.time);
};
exports.getTour = (req, res)=>{
    const id = +req.params.id;

    const tour = tours[id];
    res.status(200).json({
        status: 'success',
        data: {
            tour,
        }
    })
};
exports.createTour = (req, res)=>{
    const newTour = req.body;
    tours.push(newTour);
    res.send('Add new tour');
    console.log(tours);
};
exports.updateTour = (req, res)=>{
    res.status(201).send('tour was updated');
};
exports.deleteTour = (req, res)=>{
    const {id} = +req.params;
    tours.splice(id, 0);
    res.status(204).json({
        status: 'success',
        data: null,
    })
};

