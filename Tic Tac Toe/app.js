let boxes=document.querySelectorAll(".box")
let reset_btn=document.querySelector("#reset-btn")
let newgame=document.querySelector("#new-btn")
let msgcon=document.querySelector(".msg-container")
let msg=document.querySelector(".msg")

let turnO=true  //turnX,turnO

let winPattern=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        // console.log("button was clicked");
        if(turnO){

            box.innerHTML="O"
            box.style.color="green"
            turnO=false       
        }
        else{

            box.innerHTML="X"
            box.style.color="red"
            turnO=true
        }
        box.disabled=true
        checkWinner();
    })
})


const resetGame=()=>{
    turnO=true
    enablebox()
    msgcon.classList.add("hide")
}

const enablebox=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerHTML="";
    }
}

const disableboxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const showWinner=(winner)=>{
    msg.innerHTML= `congratulation you won ${winner}`
    msgcon.classList.remove("hide");
    disableboxes()
    
}

const draw = () => {
    msg.innerHTML = "Match was  draw";
    msgcon.classList.remove("hide");
    disableboxes();
}

const checkWinner = () => {

    // Check if someone won
    for (let pattern of winPattern) {

        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {

            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                return;
            }
        }
    }

    // Check for draw
    let filled = true;

    for (let box of boxes) {
        if (box.innerText === "") {
            filled = false;
            break;
        }
    }
    if (filled) {
        draw();
    }
}
newgame.addEventListener("click",resetGame)
reset_btn.addEventListener("click",resetGame)