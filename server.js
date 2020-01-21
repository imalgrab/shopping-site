const app = require('./app');
const port = 2115;

const server = app.listen(port, () => {
    console.log(`App listening on ${port}!`);
});