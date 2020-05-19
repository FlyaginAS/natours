const  express = require('express');

const app = express();
app.use(express.json());

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
app.get('/api/v1/tours', (req, res)=>{
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours,
        }
    })
});
app.post('/api/v1/tours', (req, res)=>{
    const newTour = req.body;
    tours.push(newTour);
    res.send('Add new tour');
    console.log(tours);
});
app.get('/api/v1/tours/:id', (req, res)=>{
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
});
app.delete('/api/v1/tours/:id', (req, res)=>{
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
});


const port = 8000;
app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
});