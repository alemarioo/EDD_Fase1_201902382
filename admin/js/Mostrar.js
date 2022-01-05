function Panel(evento, panel) {
    ResetBotones();
    ResetPaneles();
    evento.className = "btn btn-primary btn-lg active";
    document.getElementById(panel).style = "";
}


function ResetBotones() {
    document.getElementById("btn_carga").className = "btn btn-white btn-lg";
    document.getElementById("btn_reportes").className = "btn btn-white btn-lg";
    document.getElementById("btn_admin").className = "btn btn-white btn-lg";
}

function ResetPaneles() {
    document.getElementById("PanelIndex").style = "display: none;";
    document.getElementById("PanelAdminCuentas").style = "display:none;";
    document.getElementById("PanelReportes").style = "display:none;";
}


/**         MODULO DE REPORTES               */

let funcionARealizar = generarClientes
function MostrarMesUser(){
    document.getElementById("text_User").style = "";
    document.getElementById("btn_graficar").style = "";
    document.getElementById("text_Mes").style = "";
    funcionARealizar = generarEventos 
}

function MostrarClienteUser() {
    document.getElementById("text_User").style = "";
    document.getElementById("btn_graficar").style = "";
    document.getElementById("text_Mes").style = "display:none;";
    funcionARealizar = generarClientes
}

function MostrarId() {
    document.getElementById("text_User").style = "";
    document.getElementById("btn_graficar").style = "";
    document.getElementById("text_Mes").style = "display:none;";
    funcionARealizar = CargarVentasXvendedor
}
