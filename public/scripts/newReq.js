function strip(string) { 
    return string.replace(/^\s+|\s+$/g, ''); 
} 

document.userform.onsubmit = async e => {
    e.preventDefault()

    let username = document.getElementById('user_int').value
    
    let password = document.getElementById('senha_int').value

    
    username = strip(username) 
    password = strip(password)

    const options =  {
        method: 'post'
    }

    if (username != '' & password != '') {

        await fetch(`/createuser/?username=${username}&password=${password}`, options)
            .then(async response => {
                let data = await response.text()
                
                alert(data)
                
            } )
            .catch(err => console.log(err))        
    } else {
        alert('Campos incompletos!')
    }

      
}



