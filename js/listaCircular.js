class MatrizDinamica{
    constructor() {
        this.inicio = new NodoMatriz( 0, null, null, null, null)
    }

    agregar(dato, dia, hora){
        const fila = this.getDia(dia);
        const hora = this.getHora(hora);
    }
    /**
     * Funcion que retorna la fila del dia
     * @param {number} dia 
     */
    getDia(dia){
        let aux = this.inicio;

        if (!aux.derecho) {
            aux = aux.derecho;
            aux = new NodoMatriz(dia, null, aux, null, aux?.derecho);
            aux.izquie = this.inicio;
            aux.izquie.derecho = aux;
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
                return nuevo;
            }

            if (aux?.dato === dia) { return aux }
            if (!aux) {
                
                const nuevo = new NodoMatriz(dia, null, anterior, null, anterior.derecho);
                anterior.derecho = nuevo;

                if (nuevo.derecho) {
                    anterior.derecho.izquie = nuevo;
                }    
                return nuevo;
            }
            
        };
    }

    getHora(hora){
        let aux = this.inicio;

        if (!aux.abajo) {
            aux = aux.abajo;
            aux = new NodoMatriz(hora, aux, null, aux?.abajo, null);
            aux.arriba = this.inicio;
            aux.arriba.abajo = aux;
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
                return nuevo;
            }

            if (aux?.dato === hora) { return aux }
            if (!aux) {
                
                const nuevo = new NodoMatriz(hora, anterior, null, anterior.abajo, null);
                anterior.abajo = nuevo;

                if (nuevo.abajo) {
                    anterior.abajo.arriba = nuevo;
                }    
                return nuevo;
            }
            
        };
    }

    toString(){

    }
}


class NodoMatriz{
    
    /**
     * 
     * @param {} dato 
     * @param {NodoMatriz} arriba 
     * @param {NodoMatriz} izquierdo 
     * @param {NodoMatriz} Abajo 
     * @param {NodoMatriz} derecho 
     */
    constructor(dato, arriba, izquierdo, Abajo, derecho) {
        this.izquie = izquierdo;
        this.abajo = Abajo;
        this.derecho = derecho;
        this.arriba = arriba;
        this.dato = dato
    }
}
const x = new MatrizDinamica();
x.agregar(0,2,1)
x.agregar(0,3,2)
x.agregar(0,4,3)
x.agregar(0,7,4)
x.agregar(0,6,5)
x.agregar(0,1,6)
