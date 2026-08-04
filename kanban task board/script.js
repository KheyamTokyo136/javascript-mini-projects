const buttons=document.querySelectorAll(".add-btn");

buttons.forEach(button=>{

    button.addEventListener("click",()=>{

        const text=prompt("Enter Task");

        if(text===null || text.trim()==="") return;

        const task=document.createElement("div");

        task.classList.add("task");

        task.innerText=text;

        document
        .getElementById(button.dataset.column)
        .appendChild(task);

    });

});