let errorName=document.getElementById("name-error")
let errorPhone=document.getElementById("phone-error")
let errorEmail=document.getElementById("email-error")
let errorMsg=document.getElementById("message-error")
let errorSubmit=document.getElementById("submit-error")


function validateName(){
    let name=document.getElementById("contact-name").value
    if (name.length == 0) {
        errorName.innerHTML="Name is requied"
        return false
    }
    if (!name.match(/^[A-Za-z]{2,}\s[A-Za-z]{2,}$/)) {
    errorName.innerHTML = "Write full name"
    return false
}
    errorName.innerHTML = "<i class='fas fa-check-circle' style='color:green; font-size:14px;'></i>"
    return true
}

function validatePhone(){
    let phone=document.getElementById("contact-phone").value
    if (phone.length == 0) {
        errorPhone.innerHTML="Phone is requied"
        return false
    }
    if (phone.length !== 10) {
        errorPhone.innerHTML="Must be 10 digit"
        return false
    }
    if (!phone.match(/^[1-9]{10}$/)) {
    errorPhone.innerHTML = "Only digit"
    return false
}
    errorPhone.innerHTML = "<i class='fas fa-check-circle' style='color:green; font-size:14px;'></i>"
    return true
}

function validateEmail(){
    let email=document.getElementById("contact-email").value
    if (email.length == 0) {
        errorEmail.innerHTML="email is requied"
        return false
    }
    if (!email.match(/^[a-zA-Z]{2,}[0-9]{1,}@[a-zA-Z]{3,}\.[a-zA-Z]{2,4}$/)) {
    errorEmail.innerHTML = "Invalid Email "
    return false
}
    errorEmail.innerHTML = "<i class='fas fa-check-circle' style='color:green; font-size:14px;'></i>"
    return true
}

function validateMessage() {
    let email=document.getElementById("contact-message").value
    let length=30
    let left=length-email.length
    if (left > 0) {
        errorMsg.innerHTML=`${left} more character is required`
        return false
    }
    errorMsg.innerHTML = "<i class='fas fa-check-circle' style='color:green; font-size:14px;'></i>"
    return true
}

function  validateForm(){
    event.preventDefault()
     if (!validateName() || !validatePhone() || !validateEmail() || !validateMessage())
     {
        errorSubmit.style.display="block"
        errorSubmit.innerHTML="please fix your error"
       setTimeout(function(){errorSubmit.style.display="none"},3000)
       return false;
     }
    
}