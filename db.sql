DROP DATABASE devops;

CREATE DATABASE devops;

USE devops;

CREATE TABLE IF NOT EXISTS `cars` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numberPlate VARCHAR(20) NOT NULL UNIQUE,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    color VARCHAR(20) NOT NULL,
    rentBegin DATE NOT NULL,
    rentEnd DATE NOT NULL,
    rentPrice DECIMAL(10, 2) NOT NULL
);

INSERT INTO cars (numberPlate, make, model, year, color, rentBegin, rentEnd, rentPrice) VALUES
('ABC123', 'Toyota', 'Corolla', 2020, 'Red', '2023-01-01', '2023-01-10', 50.00),
('XYZ789', 'Honda', 'Civic', 2019, 'Blue', '2023-02-01', '2023-02-15', 60.00),
('LMN456', 'Ford', 'Focus', 2021, 'Black', '2023-03-01', '2023-03-05', 55.00),
('QRS234', 'Chevrolet', 'Malibu', 2022, 'White', '2023-04-01', '2023-04-10', 70.00),
('TUV567', 'Nissan', 'Altima', 2018, 'Silver', '2023-05-01', '2023-05-15', 65.00),
('WXY890', 'Hyundai', 'Elantra', 2020, 'Green', '2023-06-01', '2023-06-10', 58.00),
('JKL123', 'Kia', 'Optima', 2019, 'Yellow', '2023-07-01', '2023-07-15', 62.00),
('MNO456', 'Volkswagen', 'Jetta', 2021, 'Purple', '2023-08-01', '2023-08-10', 64.00),
('PQR789', 'Subaru', 'Impreza', 2017, 'Orange', '2023-09-01', '2023-09-10', 66.00),
('STU012', 'Mazda', 'Mazda3', 2018, 'Pink', '2023-10-01', '2023-10-10', 68.00);