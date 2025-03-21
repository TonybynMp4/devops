const db = require('./db')

class Car {
    static async getAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * from cars', (err, rows) => {
                if(err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }

    static async getById(id) {
        if (!id) {
            throw new Error('id is required');
        }

        return new Promise((resolve, reject) => {
            db.execute('SELECT * FROM cars WHERE id = ?', [id], (err, rows) => {
                if(err)
                    reject(err);
                else
                    resolve(rows[0]);
            });
        });
    }

    static async getByPlate(numberPlate) {
        if (!numberPlate) {
            throw new Error('numberPlate is required');
        }

        return new Promise((resolve, reject) => {
            db.execute('SELECT * FROM cars WHERE numberPlate = ?', [numberPlate], (err, rows) => {
                if(err)
                    reject(err);
                else
                    resolve(rows[0]);
            });
        });
    }

    static async create({ numberPlate, make, model, year, color, rentBegin, rentEnd, rentPrice }) {
        if (!rentBegin || !rentEnd || !rentPrice) {
            throw new Error('Rent details are required');
        }
        if (!numberPlate || !make || !model || !year || !color) {
            throw new Error('All fields are required');
        }

        return new Promise((resolve, reject) => {
            db.execute('INSERT INTO cars (numberPlate, make, model, year, color, rentBegin, rentEnd, rentPrice) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [numberPlate, make, model, year, color, rentBegin, rentEnd, rentPrice], (err, result) => {
                if(err)
                    reject(err);
                else
                    resolve(result);
            });
        });
    }

    static async update(numberPlate, { make, model, year, color, rentBegin, rentEnd, rentPrice }) {
        if (!numberPlate) {
            throw new Error('numberPlate is required');
        }

        if (!make && !model && !year && !color && !rentBegin && !rentEnd && !rentPrice) {
            throw new Error('At least one field is required');
        }

        const fields = [];
        const values = [];
        if (make) {
            fields.push('make = ?');
            values.push(make);
        }
        if (model) {
            fields.push('model = ?');
            values.push(model);
        }
        if (year) {
            fields.push('year = ?');
            values.push(year);
        }
        if (color) {
            fields.push('color = ?');
            values.push(color);
        }
        if (rentBegin) {
            fields.push('rentBegin = ?');
            values.push(rentBegin);
        }
        if (rentEnd) {
            fields.push('rentEnd = ?');
            values.push(rentEnd);
        }
        if (rentPrice) {
            fields.push('rentPrice = ?');
            values.push(rentPrice);
        }

        values.push(numberPlate);
        const sql = `UPDATE cars SET ${fields.join(', ')} WHERE numberPlate = ?`;
        return new Promise((resolve, reject) => {
            db.execute(sql, values, (err, rows) => {
                if(err)
                    reject(err);
                else {
                    if (rows.affectedRows === 0)
                        reject(new Error('car not found'));
                    else
                        resolve(rows);
                }
            });
        });
    }

    static async delete(id) {
        if (!id) {
            throw new Error('id is required');
        }

        return new Promise((resolve, reject) => {
            db.execute('DELETE FROM cars WHERE id = ?', [id], (err, rows) => {
                if(err)
                    reject(err);
                else {
                    if (rows.affectedRows === 0)
                        reject(new Error('car not found'));
                    else
                        resolve(rows);
                }
            });
        });
    }
}

module.exports = Car;