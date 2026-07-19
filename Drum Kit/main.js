window.addEventListener("keydown",function(e){
    const audio=document.querySelector(`audio[data-key="${e.keyCode}"]`)
    const key=document.querySelector(`.key[data-key="${e.keyCode}"]`)
    key.classList.add("playing")
    if(!audio) return;
    audio.play();
    audio.currentTime=0;
    this.setTimeout(function(){
        key.classList.remove("playing")
    },300)
})