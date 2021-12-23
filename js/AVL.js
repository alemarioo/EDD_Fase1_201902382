class AVL{
    
    constructor(){
        this.raiz = null;
    }

    insertar(valor, info){
        let temp = new nodoAVL(valor, info);
        if(this.vacio()){
            this.raiz = temp;
        }else{
            this.raiz = this.add(this.raiz,temp);
        }
    }

    vacio(){
        return self.raiz === null;
    }

    add(raiz_actual,nuevo){
        if(raiz_actual != null){
            if(raiz_actual.dato > nuevo.dato){
                raiz_actual.izq = this.add(raiz_actual.izq,nuevo);
                
                if(this.altura(raiz_actual.der)-this.altura(raiz_actual.izq)==-2){
                    if(nuevo.dato < raiz_actual.izq.dato){
                        raiz_actual = this.rotar_izquierda(raiz_actual);
                    }else{ 
                        raiz_actual = this.rotar_izquierda_derecha(raiz_actual);
                    }
                }
            }else if(raiz_actual.dato < nuevo.dato){
                raiz_actual.der = this.add(raiz_actual.der,nuevo);
                if(this.altura(raiz_actual.der)-this.altura(raiz_actual.izq)==2){
                    
                    if(nuevo.dato > raiz_actual.der.dato){ 
                        
                        raiz_actual=this.rotar_derecha(raiz_actual);
                    }else{
                        
                        raiz_actual = this.rotar_derecha_izquierda(raiz_actual);
                    }
                }

            }

            raiz_actual.altura = this.altura_maxima(this.altura(raiz_actual.der),this.altura(raiz_actual.izq))+1;
            return raiz_actual;
        }else{
            raiz_actual = nuevo;
            return raiz_actual;
        }
    }

    altura(nodoAVL){
        if(nodoAVL != null){
            return nodoAVL.altura;
        }else{
            return -1;
        }
    }

    altura_maxima(altura1,altura2){
        if(altura2>=altura1){ 
            return altura2;
        }else{
            return altura1;
        }

    }
    
    rotar_izquierda(nodoAVL){
        let aux = nodoAVL.izq;
        nodoAVL.izq= aux.der;
        aux.der = nodoAVL;
        nodoAVL.altura = this.altura_maxima(this.altura(nodoAVL.der),this.altura(nodoAVL.izq)) +1;
        aux.altura = this.altura_maxima(nodoAVL.altura.altura,this.altura(nodoAVL.izq))+1;
        return aux;
    }
    
    rotar_derecha(nodoAVL){
        let aux = nodoAVL.der;
        nodoAVL.der= aux.izq;
        aux.izq = nodoAVL;
        nodoAVL.altura = this.altura_maxima(this.altura(nodoAVL.izq),this.altura(nodoAVL.der)) +1;
        aux.altura = this.altura_maxima(nodoAVL.altura.altura,this.altura(nodoAVL.der))+1;
        return aux;
    }

    rotar_izquierda_derecha(nodoAVL){
        nodoAVL.izq = this.rotar_derecha(nodoAVL.izq);
        let aux = this.rotar_izquierda(nodoAVL);
        return aux;
    }

    
    rotar_derecha_izquierda(nodoAVL){
        nodoAVL.der = this.rotar_izquierda(nodoAVL.der);
        let aux = this.rotar_derecha(nodoAVL);
        return aux;
    }


    ImprimirEnOrden(raiz_actual){
        if(raiz_actual != null){
            this.ImprimirEnOrden(raiz_actual.izq);
            console.log(raiz_actual.dato);
            this.ImprimirEnOrden(raiz_actual.der);
        }
    }

    addClientesAUser(raiz_actual, id, cliente){
        if(raiz_actual != null){
            this.addClientesAUser(raiz_actual.izq,id, cliente);
            
            if (id === raiz_actual.dato) {
                raiz_actual.info.clientes.add(cliente.id, cliente);
                console.log(raiz_actual.info.clientes);
            }
            this.addClientesAUser(raiz_actual.der,id, cliente);
        }
    }

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

    addEventoAUser(raiz_actual, id, event){
        if(raiz_actual != null){
            this.addEventoAUser(raiz_actual.izq, id, event);
            
            if (id === raiz_actual.dato) {
                raiz_actual.info.calendario.addElementCalendar(event.mes, event);
            }
            this.addEventoAUser(raiz_actual.der,id,event);
        }
    }

    GetDotCalendarFromMonth(raiz_actual, id, mes){
        if(raiz_actual != null){
            let res = this.GetDotCalendarFromMonth(raiz_actual.izq,id, mes);
            if (res) return res
            if (id === raiz_actual.dato) {
                return raiz_actual.info.calendario.getDotFromCalendar(mes);
                
            }
            res = this.GetDotFromClient(raiz_actual.der,id, mes);
            return res
        }
    }

    generarDot(){
        let cadena=[];
        const x = this.generar_nodos(this.raiz, null);
        return x
    }

    generar_nodos(raiz_actual, arriba){ //metodo preorden
        let todo = []
        let nodos ={};
        if(raiz_actual != null){
            nodos.key = raiz_actual.dato;
            nodos.name = "id: "+raiz_actual.dato + "\nnombre: " + raiz_actual.info.nombre + "\nCorreo:" +raiz_actual.info.correo;
            if (arriba) {
                nodos.parent = arriba;    
            }
            
            
            todo.push(nodos);
            todo = todo.concat(this.generar_nodos(raiz_actual.izq, raiz_actual.dato));
            todo = todo.concat(this.generar_nodos(raiz_actual.der, raiz_actual.dato));
        }
        return todo;
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
