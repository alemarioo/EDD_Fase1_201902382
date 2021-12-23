class MatrizDinamica {
    constructor() {
        this.inicio = new NododATO(0,0, null, null, null, null, "Hora/Dia")
        this.DiaAux = null
        this.HoraAux = null
    }

    agregar(dato, dia, hora) {
        this.getDia(dia);
        this.getHora(hora);
        let aux = this.HoraAux;

        while (aux) {
            let actual = aux.derecho
            if (!actual) {
                actual = new NododATO(hora, dia, null, aux, null, null, dato);
                actual.izquie.derecho = actual
                aux = actual
                break;
            }

            if (actual.dia > dia) {
                const nuevo = new NododATO(hora, dia, null, aux, null, aux.derecho, dato)
                actual.izquie.derecho = nuevo
                actual.izquie = nuevo
                aux = nuevo
                break;
            }
            if (actual.dia === dia) {
                aux = actual
                break
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
            if (actual.hora > hora) {
                aux.arriba = actual.arriba
                aux.abajo = actual

                actual.arriba.abajo = aux
                actual.arriba = aux
                break
            }

            if (actual.hora === hora) {
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
    getDia(dia) {
        let aux = this.inicio;

        if (!aux.derecho) {
            aux = aux.derecho;
            aux = new NododATO(0 , dia, null, aux, null, aux?.derecho, "Dia " + dia);
            aux.izquie = this.inicio;
            aux.izquie.derecho = aux;
            this.DiaAux = aux
            return aux;
        }

        while (aux) {
            const anterior = aux;
            aux = aux.derecho

            if (aux?.dia > dia) {
                const nuevo = new NododATO(0,dia, null, anterior, null, anterior.derecho, "Dia " + dia);
                if (nuevo.derecho) {
                    anterior.derecho.izquie = nuevo;
                }
                anterior.derecho = nuevo;
                this.DiaAux = nuevo
                return nuevo;
            }

            if (aux?.dia === dia) { return aux }
            if (!aux) {

                const nuevo = new NododATO(0,dia, null, anterior, null, anterior.derecho, "Dia " + dia);
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
    getHora(hora) {
        let aux = this.inicio;

        if (!aux.abajo) {
            aux = aux.abajo;
            aux = new NododATO(hora, 0 ,aux, null, aux?.abajo, null, "Hora " + hora);
            aux.arriba = this.inicio;
            aux.arriba.abajo = aux;
            this.HoraAux = aux
            return aux
        }

        while (aux) {
            const anterior = aux;
            aux = aux.abajo

            if (aux?.hora > hora) {
                const nuevo = new NododATO(hora,0, anterior, null, anterior.abajo, null, "Hora " + hora);
                if (nuevo.abajo) {
                    anterior.abajo.arriba = nuevo;
                }
                anterior.abajo = nuevo;
                this.HoraAux = nuevo
                return nuevo;
            }

            if (aux?.hora === hora) { 
                this.HoraAux = aux
                return aux }
            if (!aux) {

                const nuevo = new NododATO(hora,0, anterior, null, anterior.abajo, null, "Hora " + hora);
                anterior.abajo = nuevo;

                if (nuevo.abajo) {
                    anterior.abajo.arriba = nuevo;
                }
                this.HoraAux = nuevo
                return nuevo;
            }

        };
    }

    toString() {
        let aux = this.inicio;
        let auxcolum = aux.derecho
        let cadena = "";
        while (aux) {

            while (auxcolum) {

                if (auxcolum.dato) {
                    cadena += auxcolum.dato + " ->";
                } else {
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

    GenerarDot() {
        let cadena = `
    digraph Sparce_Matrix {
        node [shape=box]
        edge [dir="both"]
        /* este es el nodo principal y lo pones en el grupo 1 para que se muestre como el origen de un todo */
        
        /* esto no se elimina, es para evitar el posicionamiento a lo loco */
        e0[ shape = point, width = 0 ];
        e1[ shape = point, width = 0 ];

        

        /* Elementos */ 

        ${this.obtenerElementos()}
}`;

        return cadena;
    }

    obtenerElementos(){
        let aux = this.inicio;
        let elementos = "";
        let relacionales = "";
        let fila = "";

        while (aux) {
            let auxColumn = aux;
            fila += "{ rank = same;"
            while (auxColumn) {
                const nodoNombre = "H" + auxColumn.hora + "D" + auxColumn.dia
                fila += nodoNombre + ";";
                elementos+=`${nodoNombre}[label = "${ auxColumn.info }" width = 1.5, group = ${auxColumn.dia+1} ];\n`
                if (auxColumn.izquie) {
                    const nodoAnterior = "H" + auxColumn.izquie.hora + "D" + auxColumn.izquie.dia
                    relacionales += nodoNombre + "->" + nodoAnterior  + "\n"
                }

                if (auxColumn.arriba) {
                    const nodoAnterior = "H" + auxColumn.arriba.hora + "D" + auxColumn.arriba.dia
                    relacionales += nodoNombre + "->" + nodoAnterior  + "\n"
                }
                
                auxColumn = auxColumn.derecho;
            }
            fila +="}\n"
            aux = aux.abajo
        }
        return elementos+"\n\n" + relacionales + "\n\n" + fila;
    }
}



class NododATO {

    /**
     * 
     * @param {number} hora
     * @param {number} dia
     * @param {NododATO} arriba 
     * @param {NododATO} izquierdo 
     * @param {NododATO} Abajo 
     * @param {NododATO} derecho 
     */
    constructor(hora, dia, arriba, izquierdo, Abajo, derecho, info) {
        this.izquie = izquierdo;
        this.abajo = Abajo;
        this.derecho = derecho;
        this.arriba = arriba;
        this.hora = hora;
        this.dia = dia;
        this.info = info.desc? info.desc: info;
    }
}


