function formShow() {
    let form_container = document.querySelector('.new-image-container') 
    form_container.style.display = 'flex'

    let content_container = document.querySelector('.content-container')
    content_container.style.filter = 'blur(1px)'
}

function formClose() {
    let img = document.getElementById('img-input')
    let bttnImg = document.querySelector('.upload-bttn img')

    let bttn = document.querySelector('.upload-bttn')

    img.style.display = 'block'
    bttnImg.src = '/images/upload-icon.svg'
    bttn.style.backgroundColor = '#00ABE1'

    let form_container = document.getElementById('new-image-container') 
    form_container.style.display = 'none'

    let content_container = document.querySelector('.content-container')
    content_container.style.filter = 'blur(0px)'
}

function uploadImg(url) {
    let username = localStorage.getItem('username')
    let password = localStorage.getItem('password')

    let options = {
        method: 'POST'
    }

    fetch(`/uploadImg/?username=${username}&password=${password}&url=${url}`, options) 
        .then(res => {
            window.location.href = `/userpage/?username=${username}&password=${password}`;
        })
}



function generateLink() {
    let img = document.getElementById('img-input')
    let bttnImg = document.querySelector('.upload-bttn img')

    let bttn = document.querySelector('.upload-bttn')

    if (img.value != '') {
        img.style.display = 'none'
        bttnImg.src = '/images/loading.gif'
        bttn.style.backgroundColor = 'white'

        const CLIENT_ID = 'solicite uma chave de acesso';
        
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Client-ID ${CLIENT_ID}`);
        
        var data = new FormData();
        data.append('image', img.files[0]);
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: data,
          redirect: 'follow'
        };
        
        fetch(`https://api.imgur.com/3/image`, requestOptions)
          .then(response => response.text())
          .then(result => {
              bttnImg.src = '/images/check.svg'
              let data = JSON.parse(result)
              console.log(data.data.link)
              uploadImg(data.data.link)
          })
          .catch(error => console.log('error', error));
    } else {
        alert('Selecione uma foto!')
    }


}
