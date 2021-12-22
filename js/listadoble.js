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
                console.log(aux.calendario);
                aux.calendario.agregar(evento, evento.dia, evento.hora);
                console.log(aux.calendario);
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
}

class NodoDoble{
    constructor(anterio, siguiente, id, calendario){
        this.anterior = anterio;
        this.siguiente = siguiente;
        this.calendario = null;
        this.id = id;
        this.calendario = calendario;
    }
}