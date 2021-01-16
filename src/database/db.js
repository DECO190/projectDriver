var knex = require('knex')({
    client: 'mysql',
    connection: {
      user : 'deco',
      password : 'sua senha ;)',
      database : 'cadastro'
    }
});


module.exports = knex
