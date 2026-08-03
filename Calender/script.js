const monthYear=document.getElementById("monthYear");
const days=document.getElementById("days");

const prev=document.getElementById("prev");
const next=document.getElementById("next");

let date=new Date();

function renderCalendar(){

days.innerHTML="";

let year=date.getFullYear();
let month=date.getMonth();

let firstDay=new Date(year,month,1).getDay();

let lastDate=new Date(year,month+1,0).getDate();

let today=new Date();

monthYear.innerText=date.toLocaleString("default",{
month:"long",
year:"numeric"
});

for(let i=0;i<firstDay;i++){
let blank=document.createElement("div");
days.appendChild(blank);
}

for(let i=1;i<=lastDate;i++){

let day=document.createElement("div");

day.innerText=i;

if(
i===today.getDate() &&
month===today.getMonth() &&
year===today.getFullYear()
){
day.classList.add("today");
}

days.appendChild(day);

}

}

prev.addEventListener("click",()=>{

date.setMonth(date.getMonth()-1);

renderCalendar();

});

next.addEventListener("click",()=>{

date.setMonth(date.getMonth()+1);

renderCalendar();

});

renderCalendar();