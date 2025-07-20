/* GET travel view */

const { title } = require("process")

const travel = (req, res) => {
    res.render('travel', { title: 'Travlr Gateways' });
    console.log(res);
};

module.exports = {
    travel
};