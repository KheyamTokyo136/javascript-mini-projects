let searchBox = document.querySelector(".container input")
let searchBtn = document.querySelector(".container button")
let picture = document.querySelector("#picture")

const apiURL = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="

function genQrCode(text) {
    if (searchBox.value.length > 0) {
        document.querySelector("#img").src = `${apiURL}${encodeURIComponent(text)}`
    picture.classList.add("img-show")
    }
    else{
        searchBox.classList.add("error")
        setTimeout(()=>{
            searchBox.classList.remove("error")
        },2000)
    }
    
}

searchBtn.addEventListener("click", () => {
    genQrCode(searchBox.value)
})