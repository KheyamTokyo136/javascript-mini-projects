let display=document.querySelector(".display")

let Timer=null;
let startTime=0;
let elapsedTime=0;
let isRunning=false;

function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        isRunning = true;
        Timer=setInterval(update,10)
    }


}

function stop() {
    if(isRunning){
        isRunning=false
        clearInterval(Timer)
        elapsedTime=Date.now() - startTime;
    }
    
}

function reset() {
    clearInterval(Timer)
     startTime=0;
     elapsedTime=0;
     isRunning=false;
     display.innerHTML="00:00:00:00"
}
function update() {

    const currentTime=Date.now();
    elapsedTime=currentTime-startTime

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours=String(hours).padStart(2,"0")
    minutes=String(minutes).padStart(2,"0")
    seconds=String(seconds).padStart(2,"0")
    milliseconds=String( milliseconds).padStart(2,"0")

    display.textContent=`${hours}:${minutes}:${seconds}:${milliseconds}`
}