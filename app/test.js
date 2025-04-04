const request = require('supertest');
const express = require('express');
const apiRoutes = require('./src/routes/api');
const { cars } = require('./src/models/db');

const app = express();
app.use(express.json());
app.use('/api', apiRoutes);

describe('API Tests', () => {
    test('GET /api/cars should return all cars', async () => {
        const response = await request(app).get('/api/cars');
        expect(response.status).toBe(200);
        expect(response.body.cars).toEqual(cars);
    });

    test('GET /api/cars/:numberPlate should return a specific car', async () => {
        const numberPlate = 'ABC123';
        const response = await request(app).get(`/api/cars/${numberPlate}`);
        expect(response.status).toBe(200);
        expect(response.body.car.numberPlate).toBe(numberPlate);
    });

    test('GET /api/cars/:numberPlate should return 404 for a non-existent car', async () => {
        const response = await request(app).get('/api/cars/INVALID');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Car not found');
    });

    test('PUT /api/cars/:numberPlate should update rent dates for a car', async () => {
        const numberPlate = 'ABC123';
        const rentBegin = '2025-04-01';
        const rentEnd = '2025-04-10';

        const response = await request(app)
            .put(`/api/cars/${numberPlate}`)
            .send({ rentBegin, rentEnd });

        expect(response.status).toBe(200);
        expect(response.body.car.rentBegin).toBe(rentBegin);
        expect(response.body.car.rentEnd).toBe(rentEnd);
    });

    test('PUT /api/cars/:numberPlate should return 404 for a non-existent car', async () => {
        const response = await request(app)
            .put('/api/cars/INVALID')
            .send({ rentBegin: '2025-04-01', rentEnd: '2025-04-10' });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Car not found');
    });
});