window.addEventListener('load', () => {
    document.getElementById('customFile').addEventListener('change', abrirArchivo);
    tabla = new TablaHash();
    inventario = new Arbol_B();
    blockChain = new BlockChain('');
});

let arbolAVL =  new AVL();
let Proveedores = new ABB();
let tabla;
let inventario;
let blockChain;

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
    alert("Se ha cargado correctamente " + JSONarchivo.length + " usuarios")
}

function Cargaprovedores(contenido) {
    
    const JSONarchivo = JSON.parse(contenido).proveedores;
    JSONarchivo.forEach(element => {
        Proveedores.addInfo(element.id, element);
    });
    alert("Se ha cargado correctamente " + JSONarchivo.length + " Proveedores")
}

function cargarEventos(contenido) {
    
    const JSONarchivo = JSON.parse(contenido).vendedores;
    JSONarchivo.forEach(element => {
        element.eventos.forEach(evento=> {
            arbolAVL.addEventoAUser(arbolAVL.raiz, element.id, evento);
        });
        
    });
    alert("Se ha cargado correctamente " + JSONarchivo.length + " ")  
}

function cargarVentas(contenido) {
    
    const JSONarchivo = JSON.parse(contenido).ventas;
    JSONarchivo.forEach(element => {

        const lista = new ListaSimple();
        element.productos.forEach(produ => {
            lista.add(produ);
        });
        element.productos = lista.inicio;
        tabla.InsertarElemento(element);
    });
    
    alert("Se ha cargado correctamente " + JSONarchivo.length + " ventas")
}

function cargarInventario(contenido) {
    
    const JSONarchivo = JSON.parse(contenido).productos;
    JSONarchivo.forEach(element => {
        inventario.insertar_nodo(element.id, element)
    });

    alert("Se ha cargado correctamente " + JSONarchivo.length + " ventas")
}

function cargarGrafo(contenido) {
    
    const JSONarchivo = JSON.parse(contenido).rutas;
    JSONarchivo.forEach(element => {
        
    });
    alert("Se ha cargado correctamente " + JSONarchivo.length + " ventas")
}

/**            ADMINISTRADOR DE FUNCION DE CARGA DEPENDE DEL BOTON */

funcionCarga = this.cargarUsuarios

function carga(tipo){
    document.getElementById("V").className = tipo === "Vendedores"? "btn btn-success": "btn btn-secondary";
    document.getElementById("P").className = tipo === "Proveedores"? "btn btn-success": "btn btn-secondary";
    document.getElementById("E").className = tipo === "Eventos"? "btn btn-success": "btn btn-secondary";
    document.getElementById("C").className = tipo === "Clientes"? "btn btn-success": "btn btn-secondary";
    document.getElementById("VE").className = tipo === "Ventas"? "btn btn-success": "btn btn-secondary";
    document.getElementById("RU").className = tipo === "Rutas"? "btn btn-success": "btn btn-secondary";
    document.getElementById("IN").className = tipo === "Inventario"? "btn btn-success": "btn btn-secondary";
    
    switch (tipo) {
        case "Vendedores":
            funcionCarga = cargarUsuarios;
            break;
        case "Clientes":
            funcionCarga = cargarClientes;
            break;
        case "Proveedores":
            funcionCarga = Cargaprovedores;
            break;
        case "Eventos":
            funcionCarga = cargarEventos;
            break;
        case "Ventas":
            funcionCarga = cargarVentas;
        break;
        case "Inventario":
            funcionCarga = cargarInventario;
        break;
        case "Rutas":
            funcionCarga = cargarGrafo;
        break;
    }
}

let listaHTML = document.getElementById("lista");


function CrearBloque() {
    blockChain.addBlock(tabla);
    middleWareHTML();
}


function middleWareHTML() {
    listaHTML.innerHTML = "";
    CargarBloquesHTML();
}

function GenerarReporteInventario() {
    console.log(inventario.graficar());
}

function CargarBloquesHTML() {
    blockChain.chain.forEach(element => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-start";
        const div = document.createElement("div");
        div.className = "ms-2 me-auto";
        const divNegrita = document.createElement("div");
        divNegrita.className = "fw-bold";
        div.appendChild(divNegrita);
        const textNode = document.createTextNode(element.hash);
        const cerrar = document.createElement("span");
        cerrar.dataset = "adad";
        cerrar.className = "badge bg-primary rounded-pill"

        const icon = document.createElement("li");
        icon.className = "fas fa-download";
        cerrar.appendChild(icon);
        //cerrar.textContent = "<i class=\"fas fa-download\"></i>";
        cerrar.onclick = function a() {
            //** FUNCION ELIMINAR AQUI */
            saveDoc(element.index,element);
        }
        divNegrita.textContent = element.index;
        div.appendChild(textNode);
        li.appendChild(div);
        listaHTML.appendChild(li);
        li.appendChild(cerrar); 
    });

}

function saveDoc(filename, data) {
    data.data = JSON.parse(data.data)
    var blob = new Blob([JSON.stringify(data,undefined,2)], {
      type: 'application/json;charset=utf-8'
    });
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(blob, filename);
    } else {
      var elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(blob);
      elem.download = filename;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    }
  }