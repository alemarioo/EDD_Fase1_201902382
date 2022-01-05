

class AVL{
    
    constructor(){
        this.raiz = null;
        this.llave = null
    }

    insertar(valor, info){
        let temp = new nodoAVL(valor, info);
        //*  Si esta vacion la raiz es el primer dato 
        if(this.vacio()){
            this.raiz = temp;
        }else{
            //*  De lo contrario retorna una raiz con nodo derechos e izquierdos
            this.raiz = this.add(this.raiz,temp);
        }
    }

    vacio(){
        return self.raiz === null;
    }

    add(raiz_actual,nuevo){
        //* Si la raiz es vacia quiere decir que se puede incertar el dato
        if(raiz_actual != null){

            //* si el nuevo es menor al nuevo se ingresara en el izquierdo
            if(raiz_actual.dato > nuevo.dato){

                //* SE INGRESA EN EL IZQUIERDO
                raiz_actual.izq = this.add(raiz_actual.izq,nuevo);
                
                //* SE CALCULAN LAS ALTURAS PARA REALIZAR LAS ROTACIONES
                if(this.altura(raiz_actual.der)-this.altura(raiz_actual.izq)==-2){

                    //* SI EL NUEVO ES MENOR QUE EL IZQUIERDO SE REALIZAR UN GIRO A LA IZQUIERDA
                    if(nuevo.dato < raiz_actual.izq.dato){
                        raiz_actual = this.rotar_izquierda(raiz_actual);
                    }else{ 
                        //* DE LO CONTRARIO SE GIRA A LA DERECHA Y LUEGO A LA IZQUIERDA
                        raiz_actual = this.rotar_izquierda_derecha(raiz_actual);
                    }
                }
            }else if(raiz_actual.dato < nuevo.dato){
                //* SE INGRESA EN EL DERECHO
                raiz_actual.der = this.add(raiz_actual.der,nuevo);

                //* SE CALCULAN LAS ALTURAS PARA REALIZAR LAS ROTACIONES
                if(this.altura(raiz_actual.der)-this.altura(raiz_actual.izq)==2){
                    
                    //* SI EL NUEVO ES MAYOT QUE EL DERECHO SE REALIZAR UN GIRO A LA DERECHA
                    if(nuevo.dato > raiz_actual.der.dato){ 
                        
                        raiz_actual=this.rotar_derecha(raiz_actual);
                    }else{
                        //* DE LO CONTRARIO SE GIRA A LA IZQUIERDA Y LUEGO A LA DERECHA
                        raiz_actual = this.rotar_derecha_izquierda(raiz_actual);
                    }
                }

            }
            //Se almacena la altura en su respectiva raiz
            raiz_actual.altura = this.altura_maxima(this.altura(raiz_actual.der),this.altura(raiz_actual.izq))+1;
            return raiz_actual;
        }else{
            raiz_actual = nuevo;
            return raiz_actual;
        }
    }

    altura(nodoAVL){
        //si hay nodo entonces regresa la altura
        if(nodoAVL){
            return nodoAVL.altura;
        }else{
            return -1;
        }
    }

    //retorna la altura mas alta
    altura_maxima(altura1,altura2){
        if(altura2>=altura1){ 
            return altura2;
        }else{
            return altura1;
        }

    }
    
    //Rota a la izquierda una raiz
    rotar_izquierda(nodoAVL){
        let aux = nodoAVL.izq;
        nodoAVL.izq= aux.der;
        aux.der = nodoAVL;
        nodoAVL.altura = this.altura_maxima(this.altura(nodoAVL.der),this.altura(nodoAVL.izq)) +1;
        aux.altura = this.altura_maxima(nodoAVL.altura.altura,this.altura(nodoAVL.izq))+1;
        return aux;
    }
    //Rota a la derecha una raiz
    rotar_derecha(nodoAVL){
        let aux = nodoAVL.der;
        nodoAVL.der= aux.izq;
        aux.izq = nodoAVL;
        nodoAVL.altura = this.altura_maxima(this.altura(nodoAVL.izq),this.altura(nodoAVL.der)) +1;
        aux.altura = this.altura_maxima(nodoAVL.altura.altura,this.altura(nodoAVL.der))+1;
        return aux;
    }
    //Rota a la derecha y luego a la izquierda una raiz
    rotar_izquierda_derecha(nodoAVL){
        nodoAVL.izq = this.rotar_derecha(nodoAVL.izq);
        let aux = this.rotar_izquierda(nodoAVL);
        return aux;
    }

    //Rota a la izquierda y luego a la derecha una raiz
    rotar_derecha_izquierda(nodoAVL){
        nodoAVL.der = this.rotar_izquierda(nodoAVL.der);
        let aux = this.rotar_derecha(nodoAVL);
        return aux;
    }

    //* Agrega un cliente a un usuario
    addClientesAUser(raiz_actual, id, cliente){
        if(raiz_actual != null){
            this.addClientesAUser(raiz_actual.izq,id, cliente);
            
            if (id === raiz_actual.dato) {
                raiz_actual.info.clientes.add(cliente.id, cliente);
            }
            this.addClientesAUser(raiz_actual.der,id, cliente);
        }
    }

    //retorna el dot de los clientes de un usuario
    GetDotFromClient(raiz_actual, id){
        if(raiz_actual != null){
            let res = this.GetDotFromClient(raiz_actual.izq,id);
            if (res) return res
            if (id === raiz_actual.dato) {
                return raiz_actual.info.clientes.generarDot();
                
            }
            res = this.GetDotFromClient(raiz_actual.der,id);
            return res
        }
    }

    //* Agrega un evento a un uuario en un determinado mes
    addEventoAUser(raiz_actual, id, event){
        if(raiz_actual != null){
            this.addEventoAUser(raiz_actual.izq, id, event);
            
            if (id === raiz_actual.dato) {
                raiz_actual.info.calendario.addElementCalendar(event.mes, event);
            }
            this.addEventoAUser(raiz_actual.der,id,event);
        }
    }

    //Retorna Dot de la matriz dipersa
    GetDotCalendarFromMonth(raiz_actual, id, mes){
        if(raiz_actual != null){
            let res = this.GetDotCalendarFromMonth(raiz_actual.izq,id, mes);
            if (res) return res
            if (id === raiz_actual.dato) {
                return raiz_actual.info.calendario.getDotFromCalendar(mes);
                
            }
            res = this.GetDotCalendarFromMonth(raiz_actual.der,id, mes);
            return res
        }
    }

    //* Genera los arrays para la visualizacion del arbol AVL
    generarTreeGojs(){
        let cadena=[];
        const x = this.generarHojas(this.raiz, null);
        return x
    }
    
    //* Genera las hojas para la visualizacion del arbol AVL
    generarHojas(raiz_actual, arriba){ //metodo preorden
        let todo = []
        let nodos ={};
        if(raiz_actual != null){
            nodos.key = raiz_actual.dato;
            nodos.name = "id: "+raiz_actual.dato + "\nnombre: " + raiz_actual.info.nombre + "\nCorreo:" +this.generarEncriptado(raiz_actual.info.correo) + "\n password:" +this.generarEncriptado(raiz_actual.info.password) +
             "\n username:" +this.generarEncriptado(raiz_actual.info.username);
            if (arriba) {
                nodos.parent = arriba;    
            }
            
            
            todo.push(nodos);
            todo = todo.concat(this.generarHojas(raiz_actual.izq, raiz_actual.dato));
            todo = todo.concat(this.generarHojas(raiz_actual.der, raiz_actual.dato));
        }
        return todo;
    }

    generarEncriptado(texto){
        if (this.llave) {
            return sha256(texto+this.llave)
        }else{
            return texto
        }
    }
}

class nodoAVL{
    constructor(dato, info){
        this.dato = dato;
        this.info = info;
        this.izq = null;
        this.der = null;
        this.altura = 0;
    }
}

class usuario{
    constructor() {
        this.id;
        this.nombre;
        this.edad;
        this.correo;
        this.password;
        this.clientes;
        this.calendario;
    }
}
