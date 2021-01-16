function strip(string) { 
    return string.replace(/^\s+|\s+$/g, ''); 
} 

document.userform.onsubmit = async e => {
    e.preventDefault()

    let username  = document.getElementById('user_int').value
    let senha = document.getElementById('senha_int').value
    const options = {
        method: 'get',
    }

    username = strip(username) 
    senha = strip(senha)
    if (username != '' && senha != '') {

        await fetch(`/auth/?username=${username}&senha=${senha}`, options) 
            .then(async response => {
                let data = await response.text()
                console.log(data)
                if (data != 'Acess denied') {
                    let obj = JSON.parse(data)
                    await localStorage.setItem(`username`, `${obj.username}`)
                    await localStorage.setItem(`password`, `${obj.password}`)
    
                    window.location.href = `/userpage/?username=${obj.username}&password=${obj.password}`;
    
                } else {
                    alert('USUARIO OU SENHA INCORRETOS')
                }
                
    
            }) 
            .catch(e => {
                console.log(e, '<<< erro')
            })
    } else {
        alert('Campos incompletos!')
    }
}

