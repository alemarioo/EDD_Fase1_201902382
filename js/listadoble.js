class ListaDobleEnlazada{
    constructor(){
        this.inicio = null;
        this.final = null;
    }

    add(mes){
        if (this.vacio()) {
            this.inicio = this.final = new NodoDoble(null, null, mes);
        }else{
            const nuevo = new NodoDoble(this.final, null, mes);
            this.final.siguiente = nuevo;
            this.final = nuevo;
        }
    }

    vacio(){
        return this.inicio === null;
    }

    remove(id){
        let aux = this.inicio;
        while (aux) {
            
            if (aux.mes === id) {
                aux.anterior.siguiente = aux.siguiente
                aux.siguiente.anterior = aux.anterior
            }

            aux  = aux.siguiente;
        }
    }
}

class NodoDoble{
    constructor(anterio, siguiente, mes){
        this.anterior = anterio;
        this.siguiente = siguiente;
        this.calendario = null;
        this.mes = mes;
    }
}