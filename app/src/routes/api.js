const {cars} = require('../models/db');
const router = require('express').Router();

router.get('/cars', async (req, res) => {
    try {
        res.status(200).json({cars});
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get('/cars/:numberPlate', async (req, res) => {
    const { numberPlate } = req.params;
    try {
        const car = cars.find(car => car.numberPlate === numberPlate);
        if (car)
            res.status(200).json({car});
        else
            res.status(404).json({ message: 'Car not found' });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.put('/cars/:numberPlate', async (req, res) => {
    const { numberPlate } = req.params;
    const { rentBegin, rentEnd } = req.body;
    try {
        const car = cars.find(car => car.numberPlate === numberPlate);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        car.rentBegin = rentBegin;
        car.rentEnd = rentEnd;
        res.status(200).json({ car });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})


