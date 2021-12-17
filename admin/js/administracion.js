let contenedorCrear = document.getElementById("contenedor_crear");
let contenedorEliminar = document.getElementById("contendor_eliminar");


let triggerCrear = document.getElementById("triggerCrear");
let triggerEliminar = document.getElementById("triggerEliminar");

function MostrarContendorCrear() {
    contenedorEliminar.style = "display:none;";
    contenedorCrear.style = "";
    
    triggerCrear.className  = "btn btn-success";
    triggerEliminar.className  = "btn btn-secondary";
    console.log(triggerCrear);
}

function MostrarContendorEliminar() {
    contenedorEliminar.style = "";
    contenedorCrear.style = "display:none;";
    triggerCrear.className  = "btn btn-secondary";
    triggerEliminar.className  = "btn btn-danger";
    CargarDatos();
}

//** PARA MOSTRAR FORMULARIO DIFERENTE */

let contenedorUser = document.getElementById("cont_user");
let contenedorProveedor = document.getElementById("cont_prove");


let triggerUsuario = document.getElementById("triggerUsuario");
let triggerProveedor = document.getElementById("triggerProveedor");

function MostrarContendorUsuario() {
    contenedorProveedor.style = "display:none;";
    contenedorUser.style = "";
    
    triggerUsuario.className  = "btn btn-success";
    triggerProveedor.className  = "btn btn-secondary";
    console.log(triggerCrear);
}

function MostrarContendorProveedor() {
    contenedorProveedor.style = "";
    contenedorUser.style = "display:none;";
    triggerUsuario.className  = "btn btn-secondary";
    triggerProveedor.className  = "btn btn-success";
}




function CargarDatos() {
    let lista = document.getElementById("lista");
    for (let i = 0; i < 10; i++) {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-start";
        const div = document.createElement("div");
        div.className = "ms-2 me-auto";
        const divNegrita = document.createElement("div");
        divNegrita.className = "fw-bold";
        div.appendChild(divNegrita);
        const textNode = document.createTextNode("asdasdasdasdasd");
        const cerrar = document.createElement("span");
        cerrar.dataset = "adad";
        cerrar.className = "badge bg-primary rounded-pill"
        cerrar.textContent = "X";
        cerrar.onclick = function a() {
            //** FUNCION ELIMINAR AQUI */
            console.log("xxx");
        }
        divNegrita.textContent = "TEXTO DE PRUEBA";
        div.appendChild(textNode);
        li.appendChild(div);
        lista.appendChild(li);
        li.appendChild(cerrar);
    }
}