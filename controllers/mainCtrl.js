const db = require('../db');

module.exports = {
    cud: function(req, res) {
        console.log('hitting me');
        console.log(req.user);
        res.status(203).send(req.user)
    },
    oops: function(req, res) {
        res.status(400).send('nope')
    }
}
