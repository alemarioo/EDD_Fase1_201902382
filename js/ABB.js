class ABB{
    constructor(){
        this.raiz = null;
    }

    //agrega la info
    addInfo(valor, info){
        // se crea el nodo
        let nuevo = new nodoABB(valor, info);

        //verifca si esta vacio
        if(this.vacio()){   
            //si lo esta la raiz es el nuev
            this.raiz= nuevo;
        }else{
            // de lo contrario lo agrgamos a la raiz actual
            this.raiz = this.add(this.raiz,nuevo);
        }
    }

    vacio(){
        return this.raiz === null
    }

    // ingresa la raiz actual y el nuevo
    add(actual,nuevo){
        //verificar si la raiz actual esta vacia
        if(actual != null){
            //verifica si el id del nuevo es mayor al ID
            if(actual.id > nuevo.id){
                // se agrega pero a la raiz izquierda
                actual.izquierdo = this.add(actual.izquierdo,nuevo);
            //verifica si el id del nuevo es menor al ID
            }else if(actual.id < nuevo.id){
                // se agrega pero a la raiz derecha
                actual.derecho = this.add(actual.derecho,nuevo);
            }

            return actual;
        }else{
            actual = nuevo;
            return actual;
        }
    }
    //genero el array para generar en la libreria de graficacion
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