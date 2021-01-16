function remove() {
    let url = document.querySelector('.full-img').src
    
     
    const options = {
        method: 'POST'
    }

    let username = localStorage.getItem('username')
    let password = localStorage.getItem('password')
    
    fetch(`/removeImg/?username=${username}&password=${password}&url=${url}`, options)
        .then(res => {
            window.location.href = `/userpage/?username=${username}&password=${password}`;
        })
}