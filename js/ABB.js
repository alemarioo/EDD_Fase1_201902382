class ABB{
    constructor(){
        this.raiz = null;
    }

    insertar(valor){
        let nuevo = new nodo(valor);

        if(this.vacio()){
            this.raiz= nuevo;
        }else{
            this.raiz = this.add(this.raiz,nuevo);
        }
    }

    vacio(){
        return this.raiz === null
    }

    add(actual,nuevo){
        if(actual != null){
            if(actual.id > nuevo.id){
                actual.izquierdo = this.add(actual.izquierdo,nuevo);

            }else if(actual.id < nuevo.id){
                actual.derecho = this.add(actual.derecho,nuevo);
            }

            return actual;
        }else{
            actual = nuevo;
            return actual;
        }
    }


    inOrden(actual){
        if(actual != null){
            this.inOrden(actual.izquierdo);
            console.log(actual.id);
            this.inOrden(actual.derecho);
        }
    }

}

class nodoABB{
    constructor(id, info){
        this.id = id;
        this.izquierdo = null;
        this.derecho = null;
        this.info = info
    }
}