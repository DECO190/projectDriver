const db = require('./db.js')
const bcrypt = require('bcrypt');

let user = async function(username, password, response) {
    
    try {
        var res = await db.insert({username: `${username}`, password: `${password}`, photos: '' }).into('users')
    } catch(err) {
        console.log('user duplicado')
    }
    if (res != undefined) {
        await bcrypt.hash(password, 5, async function(err, hash) {
            let a = await db('users')
                .where({ username: `${username}` })
                .update({ password: `${hash}` })
        });  
        
        response.send('usuario criado com sucesso ;) | Faça login para ter acesso a sua conta...')
        return
    } else {
        response.send('Nome de usuario indisponivel :(')
        return
    }
}



module.exports = user