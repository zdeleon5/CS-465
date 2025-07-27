var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));


/* GET travel view */
const { title } = require("process")

const travel = (req, res) => {
    res.render('travel', { title: 'Travlr Gateways', trips });
    console.log(res);
};

module.exports = {
    travel
};