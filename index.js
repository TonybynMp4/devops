const app = require('./app');
app
.set('port', process.env.PORT ?? 3000)
.set('host', process.env.HOST);

const port = app.get('port');
app.listen(port, () => {
    console.log(`Server listening on ${app.get('host')} ${port}`);
});