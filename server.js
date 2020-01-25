const app = require('./app');

app.set('port', 2115);

const server = app.listen(app.get('port'), () => {
    console.log(`App listening on ${server.address().port}`);
});