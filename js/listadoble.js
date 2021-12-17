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
}

class NodoDoble{
    constructor(anterio, siguiente, mes){
        this.anterior = anterio;
        this.siguiente = siguiente;
        this.calendario = null;
        this.mes = mes;
    }
}

console.log("a");

const x = new ListaDobleEnlazada();
x.add(1);
x.add(2);
x.add(3);
x.add(4);
x.add(5);
x.add(6);