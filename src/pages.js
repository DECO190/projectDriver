// https://devhints.io/knex#select-1
const bcrypt = require('bcrypt');
const { create } = require('hbs')
const db = require('./database/db.js')
module.exports = {

    async index(req, res) {
        return res.render('index')
    }, 

    async auth(req, res) {
        
        const username = req.query.username
        const senha = req.query.senha

        const data = await db('users').where({ username: `${username}` }).select('username', 'password')
        
        

        if (data.length >=1){
            let compare = await bcrypt.compare(senha, data[0].password)
            
            if (compare) {
                await res.send({ 
                    username: data[0].username, 
                    password: data[0].password
                })
            } else {
                await res.send('Acess denied')
            }

        } else {
            await res.send('Acess denied')
        }
    },

    async userpage(req, res) {
        const username = req.query.username
        const senha = req.query.password
        const data = await db('users').where({ username: `${username}` , password: `${senha}` }).select('username', 'password', 'photos')
        
        
        if (data.length >=1){
            let images = await {photos: data[0].photos.split('|')} 
            await res.render('userpage', { images })
            return
        } else {
            await res.render('index')
            return
        }
    },

    async createUserRender(req, res){
        res.render('create-user')
    },

    async createUser(req, res){
        let createUserFunction = require('./database/createuser.js')

        let username = req.query.username
        let password = req.query.password

        
        await createUserFunction(username, password, res)
    }, 

    async uploadImg(req, res) {
        let username = req.query.username
        let password = req.query.password
        let url = req.query.url

        const data = await db('users').where({ username: `${username}` , password: `${password}` }).select('photos')

        const photos = await data[0].photos
        
        const final = await photos + '|' + url


        await db('users').where({ username: `${username}` , password: `${password}` }).update({ photos: `${final}` })

        res.status('200').send('Img posted')

    }, 

    async remove(req, res) {

        function removeImg(url, photos) {
            let arr = photos.split('|')
        
            let res = ''
            console.log(arr)
            for (let i in arr) {
                if (arr[i] != url && i != arr.length - 1 && arr[i] != '') {
                    res += '|' + arr[i] 
                } else if (arr[i] != url && i == arr.length - 1 && arr[i] != '') {
                    res += arr[i]
                }
            }
        
            return res
        }

        try {
            
            let url = req.query.url
            let username = req.query.username
            let password = req.query.password
            
            const data = await db('users').where({ username: `${username}` , password: `${password}` }).select('photos')
            
            let newPhotos = removeImg(url, data[0].photos)
    
            await db('users').where({ username: `${username}` , password: `${password}` }).update({ photos: newPhotos  })
            await res.send('OK')
            return
        } catch(err) {
            res.send('ERR')
        }
        
    }

}
