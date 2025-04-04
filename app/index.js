const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

app
.use(express.json({limit: '50mb'}))
.use(express.urlencoded({ extended: true }))
.set('port', process.env.PORT ?? 4000)
.set('host', process.env.HOST ?? 'localhost');

app.use("/api", require("./src/routes/api.js"));



const port = app.get('port');
app.listen(port, () => {
    console.log(`Server listening on ${app.get('host')} ${port}`);
});