function returnUser() {
    let username = localStorage.getItem('username')
    let password = localStorage.getItem('password')
    console.log(password)
    if (username != null && password != null) {
        window.location.href = `/userpage/?username=${username}&password=${password}`;
    }

}

function logOut() {
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    window.location.href = '/'
}