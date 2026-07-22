const notesContainer=document.querySelector(".notes-container")
const createBtn=document.querySelector(".btn")
const notes=document.querySelectorAll(".input-box")

createBtn.addEventListener("click",()=>{
    const inputBox=document.createElement("p")
    inputBox.className="input-box"
    inputBox.setAttribute("contenteditable","true")
    const img=document.createElement("img")
    img.src="delete.png"
    notesContainer.appendChild(inputBox).appendChild(img)
    
})

notesContainer.addEventListener("click",(e)=>{
    if(e.target.tagName ==="IMG"){
        e.target.parentElement.remove()
    updateData()
    }
    else if(e.target.tagName==="P"){
        const notes=document.querySelectorAll(".input-box")
        notes.forEach(nt=>{
            nt.onkeyup=function(){
                 updateData()
            }
            
        })
    }
})

function updateData() {
    localStorage.setItem("data",notesContainer.innerHTML)
}

function getData() {
    notesContainer.innerHTML=localStorage.getItem("data")
}
getData();