const Car = require('../models/cars');

const router = require('express').Router();

// public API (unprotected, unauthenticated)
router.get('/cars', async (req, res) => {
    try {
        const cars = await Car.getAll({ withMedia: true, withComments: true, withLikes: true });
        res.status(200).json({cars});
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get('/cars/:numberPlate', async (req, res) => {
    const { numberPlate } = req.params;
    try {
        const car = await Car.getByPlate(numberPlate);
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
        const car = await Car.getByPlate(numberPlate);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        const updatedCar = await Car.update(numberPlate, { rentBegin, rentEnd });
        res.status(200).json({ updatedCar });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})


module.exports = router;