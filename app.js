const  express = require('express');

const app = express();
app.use(express.json());
app.use((req, res, next)=>{
    console.log('Hello from the my middleware');
    next();
});
app.use((req, res, next)=>{
    req.time = new Date().toISOString();
    next();
});

const tours = [
    {
        name: 'Egypt',
        price: 120,
    },
    {
        name: 'Germany',
        price: 100,
    },
    {
        name: 'Finland',
        price: 300,
    },
];
const getAllTours = (req, res)=>{
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours,
        }
    });
    console.log(req.time);
};
const getTour = (req, res)=>{
    const id = req.params.id;
    if(id > tours.length-1 || id < 0){
        res.status(404).json({
            status: 'not found',
            data: null,
        })
    }
    const tour = tours[id];
    res.status(200).json({
        status: 'success',
        data: {
            tour,
        }
    })
};
const createTour = (req, res)=>{
    const newTour = req.body;
    tours.push(newTour);
    res.send('Add new tour');
    console.log(tours);
};
const deleteTour = (req, res)=>{
    const {id} = +req.params;
    if(id > tours.length-1 || id < 0){
        res.status(404).json({
            status: 'not found',
            data: null,
        })
    }
    tours.splice(id, 0);
    res.status(204).json({
        status: 'success',
        data: null,
    })
};

app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);
app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .delete(deleteTour);

const port = 8000;
app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
});