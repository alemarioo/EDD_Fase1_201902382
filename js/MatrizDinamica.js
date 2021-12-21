class MatrizDinamica{
    constructor() {
        this.inicio = new NodoMatriz( 0, null, null, null, null)
        this.DiaAux = null
        this.HoraAux = null
    }

    agregar(dato, dia, hora){
        this.getDia(dia);
        this.getHora(hora);

        let aux = this.HoraAux;
        
        while (aux) {
            let actual = aux.derecho
            if (!actual) {
                actual = new NododATO(hora, dia, null, aux, null, null);
                actual.izquie.derecho = actual
                aux = actual
                break;
            }

            if (actual.dia > dia ) {
                const nuevo = new NododATO(hora, dia, null, this.HoraAux, aux, null)
                actual.izquie.derecho = nuevo
                actual.izquie = nuevo
                aux = nuevo
                break;
            }
            aux = aux.derecho
        }
        
        let axuFila = this.DiaAux
        
        while (axuFila) {
            let actual = axuFila.abajo
            if (!actual) {
                axuFila.abajo = aux
                aux.arriba = axuFila
                break;
            }
            if (axuFila.hora > hora ) {
                aux.arriba = axuFila.arriba 
                aux.abajo = axuFila

                axuFila.arriba.abajo = aux
                axuFila.arriba = aux
                break
            }
            axuFila = axuFila.abajo
        }


    }
    /**
     * Funcion que retorna la fila del dia
     * @param {number} dia 
     * @returns {NodoMatriz} nodo nuevo o que encuentra en al matriz
     */
    getDia(dia){
        let aux = this.inicio;

        if (!aux.derecho) {
            aux = aux.derecho;
            aux = new NodoMatriz(dia, null, aux, null, aux?.derecho);
            aux.izquie = this.inicio;
            aux.izquie.derecho = aux;
            this.DiaAux = aux
            return aux;
        }
        
        while (aux){
            const anterior = aux;
            aux = aux.derecho
            
            if (aux?.dato > dia) {
                const nuevo = new NodoMatriz(dia, null, anterior, null, anterior.derecho);
                if (nuevo.derecho) {
                    anterior.derecho.izquie = nuevo;
                }    
                anterior.derecho = nuevo;
                this.DiaAux = nuevo
                return nuevo;
            }

            if (aux?.dato === dia) { return aux }
            if (!aux) {
                
                const nuevo = new NodoMatriz(dia, null, anterior, null, anterior.derecho);
                anterior.derecho = nuevo;

                if (nuevo.derecho) {
                    anterior.derecho.izquie = nuevo;
                }    
                this.DiaAux = nuevo
                return nuevo;
            }
            
        };
    }
    /**
     * 
     * @param {number} hora 
     * @returns {NodoMatriz} nodo nuevo o que encuentra en al matriz
     */
    getHora(hora){
        let aux = this.inicio;

        if (!aux.abajo) {
            aux = aux.abajo;
            aux = new NodoMatriz(hora, aux, null, aux?.abajo, null);
            aux.arriba = this.inicio;
            aux.arriba.abajo = aux;
            this.HoraAux = aux
            return aux
        }
        
        while (aux){
            const anterior = aux;
            aux = aux.abajo
            
            if (aux?.dato > hora) {
                const nuevo = new NodoMatriz(hora,anterior, null, anterior.abajo, null);
                if (nuevo.abajo) {
                    anterior.abajo.arriba = nuevo;
                }    
                anterior.abajo = nuevo;
                this.HoraAux = nuevo
                return nuevo;
            }

            if (aux?.dato === hora) { return aux }
            if (!aux) {
                
                const nuevo = new NodoMatriz(hora, anterior, null, anterior.abajo, null);
                anterior.abajo = nuevo;

                if (nuevo.abajo) {
                    anterior.abajo.arriba = nuevo;
                }    
                this.HoraAux = nuevo
                return nuevo;
            }
            
        };
    }

    toString(){
        let aux = this.inicio;
        let auxcolum = aux.derecho
        let cadena = "";
        while(aux){
            
            while (auxcolum){
                
                if (auxcolum.dato) {
                    cadena += auxcolum.dato + " ->";    
                }else{
                    cadena += auxcolum.dia + "," + auxcolum.hora + " ->";    
                }
                
                auxcolum = auxcolum.derecho
            }
            cadena += "\n";
            aux = aux.abajo;
            auxcolum = aux?.derecho;
        }
        return cadena
    }
}


class NodoMatriz{
    
    /**
     * 
     * @param {} dato 
     * @param {NododATO} arriba 
     * @param {NododATO} izquierdo 
     * @param {NododATO} Abajo 
     * @param {NododATO} derecho 
     */
    constructor(dato, arriba, izquierdo, Abajo, derecho) {
        this.izquie = izquierdo;
        this.abajo = Abajo;
        this.derecho = derecho;
        this.arriba = arriba;
        this.dato = dato
    }
}


class NododATO{
    
    /**
     * 
     * @param {number} hora
     * @param {number} dia
     * @param {NodoMatriz} arriba 
     * @param {NodoMatriz} izquierdo 
     * @param {NodoMatriz} Abajo 
     * @param {NodoMatriz} derecho 
     */
    constructor(hora, dia, arriba, izquierdo, Abajo, derecho) {
        this.izquie = izquierdo;
        this.abajo = Abajo;
        this.derecho = derecho;
        this.arriba = arriba;
        this.hora = hora
        this.dia = dia
    }
}

