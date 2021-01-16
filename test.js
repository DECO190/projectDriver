function removeImg(url, photos) {
    let arr = photos.split('|')

    console.log(arr)
    let res = ''
    for (let i in arr) {
        console.log(arr[i])
        if (arr[i] != url){
            res += arr[i] + '|'
        }
    }

    return res
}

removeImg('https://i.imgur.com/MgkC99y.jpg')