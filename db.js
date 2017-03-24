const massive = require('massive');

const massiveInstance = massive.connectSync({
  connectionString: 'postgres://MrGaud@localhost/leagupdb'
})

module.exports = massiveInstance
