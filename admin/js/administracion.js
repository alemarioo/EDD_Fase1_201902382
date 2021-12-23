window.addEventListener('load', () => {
    $ = go.GraphObject.make;
    myDiagram =  $(go.Diagram, "myDiagramDiv",
    {
      "undoManager.isEnabled": true,
      layout: $(go.TreeLayout, // specify a Diagram.layout that arranges trees
                { angle: 90, layerSpacing: 35 })
    });
});

let contenedorCrear = document.getElementById("contenedor_crear");
let contenedorEliminar = document.getElementById("contendor_eliminar");


let triggerCrear = document.getElementById("triggerCrear");
let triggerEliminar = document.getElementById("triggerEliminar");

var $ = null;
var myDiagram = null; 

function generarVendedores() {
// define a simple Node template
    myDiagram.nodeTemplate =
    $(go.Node, "Horizontal",
        { background: "#A3DA8D" },
        $(go.TextBlock, "Default Text",
        { margin: 12, stroke: "white", font: "century-gothic 16px" },
        new go.Binding("text", "name"))
    );

    myDiagram.model = new go.TreeModel(
        arbolAVL.generarTreeGojs()
    ); 
}

function generarClientes() {
    // define a simple Node template
        myDiagram.nodeTemplate =
        $(go.Node, "Horizontal",
            { background: "#A3DA8D" },
            $(go.TextBlock, "Default Text",
            { margin: 12, stroke: "white", font: "century-gothic 16px" },
            new go.Binding("text", "text"))
        );

        myDiagram.linkTemplate =
        $(go.Link,
            $(go.Shape),
            $(go.Shape,   // the "from" end arrowhead
            { fromArrow: "Backward" }),
            $(go.Shape,   // the "to" end arrowhead
            { toArrow: "Standard"})
        );
        const Iduser = +document.getElementById("input_id").value;
        if (!Iduser) {
            alert("El numero debe ser valido");
            return
        }
        console.log(Iduser);
        const res = arbolAVL.GetDotFromClient(arbolAVL.raiz,Iduser);
        
        myDiagram.model = new go.GraphLinksModel(
            res.template,
            res.relacionales
        ); 
}

function generarEventos() {
    // define a simple Node template
    myDiagram.nodeTemplate =
    $(go.Node, "Horizontal",
        { background: "#A3DA8D" },
        $(go.TextBlock, "Default Text",
        { margin: 12, stroke: "white", font: "century-gothic 16px" },
        new go.Binding("text", "text"))
    );

    myDiagram.linkTemplate =
    $(go.Link,
        $(go.Shape),
        $(go.Shape,   // the "from" end arrowhead
        { fromArrow: "Backward" }),
        $(go.Shape,   // the "to" end arrowhead
        { toArrow: "Standard"})
    );
    const Iduser = +document.getElementById("input_id").value;
    if (!Iduser) {
        alert("El numero debe ser valido");
        return
    }
    const mes = document.getElementById("Mes_selected").value
    
    const res = arbolAVL.GetDotCalendarFromMonth(arbolAVL.raiz, Iduser, mes);
    console.log(res);
    myDiagram.model = new go.GraphLinksModel(
        res.elementos,
        res.relacionales
    ); 
}


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
    middleWareCargar();
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
}

function MostrarContendorProveedor() {
    contenedorProveedor.style = "";
    contenedorUser.style = "display:none;";
    triggerUsuario.className  = "btn btn-secondary";
    triggerProveedor.className  = "btn btn-success";
}



let lista = document.getElementById("lista");

function middleWareCargar() {
    lista.innerHTML = "";
    CargarDatosUsuarios(arbolAVL.raiz);
}

function CargarDatosUsuarios(raiz) {

    if (!raiz) {
        return
    }

    CargarDatosUsuarios(raiz.izq);
    
    
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-start";
    const div = document.createElement("div");
    div.className = "ms-2 me-auto";
    const divNegrita = document.createElement("div");
    divNegrita.className = "fw-bold";
    div.appendChild(divNegrita);
    const textNode = document.createTextNode(raiz.info.correo);
    const cerrar = document.createElement("span");
    cerrar.dataset = "adad";
    cerrar.className = "badge bg-primary rounded-pill"
    cerrar.textContent = "X";
    cerrar.onclick = function a() {
        //** FUNCION ELIMINAR AQUI */
        console.log("xxx");
    }
    divNegrita.textContent = raiz.info.nombre;
    div.appendChild(textNode);
    li.appendChild(div);
    lista.appendChild(li);
    li.appendChild(cerrar);

    CargarDatosUsuarios(raiz.der);
}