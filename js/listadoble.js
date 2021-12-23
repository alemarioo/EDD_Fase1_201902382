class ListaDobleEnlazada{
    constructor(){
        this.inicio = null;
        this.final = null;
    }

    add(id, info){
        if (this.vacio()) {
            this.inicio = this.final = new NodoDoble(null, null, id, info);
        }else{
            const nuevo = new NodoDoble(this.final, null, id, info);
            this.final.siguiente = nuevo;
            this.final = nuevo;
        }
    }

    vacio(){
        return this.inicio === null;
    }

    addElementCalendar(mes, evento){
        let aux = this.inicio;
        while (aux) {
            if (aux.id === mes) {
                console.log(evento);
                aux.calendario.agregar(evento, evento.dia, evento.hora);
            }
            aux  = aux.siguiente;
        }
    }

    remove(id){
        let aux = this.inicio;
        while (aux) {
            if (aux.id === id) {
                aux.anterior.siguiente = aux.siguiente;
                aux.siguiente.anterior = aux.anterior;
            }
            aux  = aux.siguiente;
        }
    }

    getDotFromCalendar(id){
        let aux = this.inicio;
        while (aux) {
            if (aux.id === id) {
                return aux.calendario.GenerarDot();
            }
            aux  = aux.siguiente;
        }
    }

    generarDot(){
        let aux = this.inicio;
        let relacionales = "";
        let template = `
        digraph Sparce_Matrix {
            rankdir=LR
            node [shape=box];
            edge [dir="both"];
        `

        while (aux) {
            console.log(aux.calendario);
            template+=`N${aux.id}[label = "Nombre: ${aux.calendario.nombre} Correo: ${aux.calendario.correo} " width = 1.5, group = 1 ];\n`
            if (aux.siguiente) {
                relacionales+=`N${aux.id} -> N${aux.siguiente.id}\n`
            }
            aux  = aux.siguiente;
        }
        template+= "\n\n" + relacionales + "\n }"
        return template
    }
}

class NodoDoble{
    constructor(anterio, siguiente, id, calendario){
        this.anterior = anterio;
        this.siguiente = siguiente;
        this.id = id;
        this.calendario = calendario;
    }
}