const button = document.getElementById("Ingresar");
let NombreUser = document.getElementById("user");
let password = document.getElementById("password");

button.addEventListener("click", ()=>{
    if (NombreUser.value === "Admin" && password.value === "1234") {
        window.location.replace("admin/index.html");
    }else{
        window.location.replace("user/index.js");
    }
})