/* GET Homepage */

const index = (req, res) => {
    res.render('index', { title: 'Travlr Getaways' });
    console.log(res);
}

module.exports = {
    index
};