class ListaSimple{
    constructor() {
        this.inicio = null;
        this.final = null;
    }

    add(dato){
        if (this.vacio()) {
            this.inicio = this.final = dato
        }else{
            const nuevo = dato
            this.final.siguiente = dato
            this.final = dato
        }
    }

    vacio(){
        return this.inicio === null
    }

}
