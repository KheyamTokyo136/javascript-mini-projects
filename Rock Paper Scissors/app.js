let userScore=0;
let comScore=0;

const choices=document.querySelectorAll(".choice")
const msg=document.querySelector("#msg")
const user_score=document.getElementById("user-score")
const com_score=document.getElementById("com-score")


const genComChoice=()=>{
    let option=["paper","scissor","rock"]
    const indx=Math.floor(Math.random()*3)
    return option[indx]
}


const draw=()=>{
    msg.innerHTML="Game was draw. Play Again "
    msg.style.background="#081b31"
    
}


const showWinner=(userwin, userChioce,comchoice)=>{
    if(userwin){
        msg.innerHTML=`you won. your ${userChioce} beats ${comchoice} `
        msg.style.background="green"
        userScore++
        user_score.innerHTML=userScore
        
    }
    else{
        msg.innerHTML=`you lost.${comchoice} beats your ${userChioce} `
        msg.style.background="red"
        comScore++
        com_score.innerHTML=comScore
    }
}


const playGame=(userChioce)=>{
    // console.log("user choice=",userChioce);
    //generate computer choice modular wave of programming
    const comchoice=genComChoice()
    // console.log("computer choice=",comchoice);
    if(userChioce==comchoice){
        // Draw game
        draw();
    } else
        {
            let userwin=true;
            if(userChioce==="rock"){
                //scissor paper
                userwin= comchoice==="paper"?false:true
            } else if(userChioce==="paper"){
                // scissor rock
                userwin=comchoice==="scissor"?false:true;
            } else{
                // rock paper
                userwin=comchoice==="rock" ? false : true;
            }
            showWinner(userwin, userChioce,comchoice);
        
        }
    
}


choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        const userChioce=choice.getAttribute("id")
        //  console.log("choice was clicked",userChioce);
         playGame(userChioce)
         
    })
})









