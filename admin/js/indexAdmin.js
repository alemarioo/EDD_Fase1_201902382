
window.addEventListener('load', () => {
    document.getElementById('customFile').addEventListener('change', abrirArchivo);
});
let arbolAVL =  new AVL();

function abrirArchivo(evento){
    let archivo = evento.target.files[0];

    if (archivo){
        let reader = new FileReader();

        reader.onload = function(e) {
            let contenido = e.target.result;
            funcionCarga(contenido);
        };

        reader.readAsText(archivo);
    } else {
        document.getElementById('mensajes').innerText = 'No se ha seleccionado un archivo.';
    }
}

function cargarUsuarios(contenido){
    const JSONarchivo = JSON.parse(contenido).vendedores;
    JSONarchivo.forEach(element => {
        let userTemp = new usuario();
        userTemp.id = element.id;
        userTemp.nombre = element.nombre;
        userTemp.edad = element.edad;
        userTemp.correo = element.correo;
        userTemp.password = element.password;
        userTemp.clientes = new ListaDobleEnlazada();
        userTemp.calendario = new ListaDobleEnlazada();

        for (let i = 1; i <= 12; i++) {
            userTemp.calendario.add(i, new MatrizDinamica());
        }
        arbolAVL.insertar(element.id, userTemp);
        
    });
    alert("Se ha cargado correctamente " + JSONarchivo.length + " usuarios")
}

function cargarClientes(contenido) {
    
    const JSONarchivo = JSON.parse(contenido).vendedores;
    JSONarchivo.forEach(element => {
        console.log(element.id);
        element.clientes.forEach(cliente => {
            arbolAVL.addClientesAUser(arbolAVL.raiz, element.id, cliente);    
        });
        
    });
    
    //arbolAVL.GetDotFromClient(arbolAVL.raiz, 1);
    alert("Se ha cargado correctamente " + JSONarchivo.length + " usuarios")
}

function Cargaprovedores(contenido) {
    
    const JSONarchivo = JSON.parse(contenido).proveedores;
    JSONarchivo.forEach(element => {
        
        console.log(element);
        //arbolAVL.addClientesAUser(arbolAVL.raiz, element.id, cliente);    
        
        
    });
    
    alert("Se ha cargado correctamente " + JSONarchivo.length + " Proveedores")
}

function cargarEventos(contenido) {
    
    const JSONarchivo = JSON.parse(contenido).vendedores;
    JSONarchivo.forEach(element => {
        console.log(element.id);
        element.eventos.forEach(evento=> {
            console.log(evento);
            arbolAVL.addEventoAUser(arbolAVL.raiz, element.id, evento);
        });
        
    });
    
    
    //console.log(arbolAVL.GetDotCalendarFromMonth(arbolAVL.raiz, 1, 1));
    alert("Se ha cargado correctamente " + JSONarchivo.length + " ")  
}



/**            ADMINISTRADOR DE FUNCION DE CARGA DEPENDE DEL BOTON */

funcionCarga = this.cargarUsuarios

function carga(tipo){
    document.getElementById("V").className = tipo === "Vendedores"? "btn btn-success": "btn btn-secondary";
    document.getElementById("P").className = tipo === "Proveedores"? "btn btn-success": "btn btn-secondary";
    document.getElementById("E").className = tipo === "Eventos"? "btn btn-success": "btn btn-secondary";
    document.getElementById("C").className = tipo === "Clientes"? "btn btn-success": "btn btn-secondary";

    switch (tipo) {
        case "Vendedores":
            funcionCarga = cargarUsuarios
            break;
        case "Clientes":
            funcionCarga = cargarClientes
            break;
        case "Proveedores":
            funcionCarga = Cargaprovedores
            break;
        case "Eventos":
            funcionCarga = cargarEventos
            break;
    }
}