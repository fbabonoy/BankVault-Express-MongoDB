let email = document.querySelector("#userName")
let password = document.querySelector("#password")
const login = document.querySelector("#cardInfo")


function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email); 
}


login.addEventListener("click", (e)=>{
    e.preventDefault
    if (email.value && password.value && isValidEmail(email.value)) {
        console.log("hello")
        window.location.href = "http://localhost:8085/accounts/johndoe@example.compassword123/?api-key=admin"

    } else if (!isValidEmail(email.value)) {
        alert("use a valid email")
    } else {
        alert("you need both and emmal and a passowed")
    }
    
})
