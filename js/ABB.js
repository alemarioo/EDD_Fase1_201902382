class ABB{
    constructor(){
        this.raiz = null;
    }

    addInfo(valor, info){
        let nuevo = new nodoABB(valor, info);

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

    generarTreeGojs(){
        const x = this.generarHojas(this.raiz, null);
        return x
    }

    //* Genera las hojas para la visualizacion del arbol AVL
    generarHojas(raiz_actual, arriba){ //metodo preorden
        let todo = []
        let nodos ={};
        if(raiz_actual != null){
            nodos.key = raiz_actual.id;
            nodos.name = "id: "+raiz_actual.id + "\nnombre: " + raiz_actual.info.nombre + "\nCorreo:" +raiz_actual.info.correo+"\ntelofono:"+ raiz_actual.info.telefono+"\nDireccion:" + raiz_actual.info.direccion;
            if (arriba) {
                nodos.parent = arriba;    
            }
            
            
            todo.push(nodos);
            todo = todo.concat(this.generarHojas(raiz_actual.izquierdo, raiz_actual.id));
            todo = todo.concat(this.generarHojas(raiz_actual.derecho, raiz_actual.id));
        }
        return todo;
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