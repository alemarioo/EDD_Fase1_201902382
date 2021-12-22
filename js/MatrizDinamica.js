class MatrizDinamica {
    constructor() {
        this.inicio = new NodoMatriz(0, null, null, null, null)
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
                actual = new NododATO(hora, dia, null, aux, null, null);
                actual.izquie.derecho = actual
                aux = actual
                break;
            }

            if (actual.dia > dia) {
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
            if (axuFila.hora > hora) {
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
    getDia(dia) {
        let aux = this.inicio;

        if (!aux.derecho) {
            aux = aux.derecho;
            aux = new NodoMatriz(dia, null, aux, null, aux?.derecho);
            aux.izquie = this.inicio;
            aux.izquie.derecho = aux;
            this.DiaAux = aux
            return aux;
        }

        while (aux) {
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
    getHora(hora) {
        let aux = this.inicio;

        if (!aux.abajo) {
            aux = aux.abajo;
            aux = new NodoMatriz(hora, aux, null, aux?.abajo, null);
            aux.arriba = this.inicio;
            aux.arriba.abajo = aux;
            this.HoraAux = aux
            return aux
        }

        while (aux) {
            const anterior = aux;
            aux = aux.abajo

            if (aux?.dato > hora) {
                const nuevo = new NodoMatriz(hora, anterior, null, anterior.abajo, null);
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
}


class NodoMatriz {

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


class NododATO {

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


var CircularJSON = function (JSON, RegExp) { var specialChar = "~", safeSpecialChar = "\\x" + ("0" + specialChar.charCodeAt(0).toString(16)).slice(-2), escapedSafeSpecialChar = "\\" + safeSpecialChar, specialCharRG = new RegExp(safeSpecialChar, "g"), safeSpecialCharRG = new RegExp(escapedSafeSpecialChar, "g"), safeStartWithSpecialCharRG = new RegExp("(?:^|([^\\\\]))" + escapedSafeSpecialChar), indexOf = [].indexOf || function (v) { for (var i = this.length; i-- && this[i] !== v;); return i }, $String = String; function generateReplacer(value, replacer, resolve) { var doNotIgnore = false, inspect = !!replacer, path = [], all = [value], seen = [value], mapp = [resolve ? specialChar : "[Circular]"], last = value, lvl = 1, i, fn; if (inspect) { fn = typeof replacer === "object" ? function (key, value) { return key !== "" && replacer.indexOf(key) < 0 ? void 0 : value } : replacer } return function (key, value) { if (inspect) value = fn.call(this, key, value); if (doNotIgnore) { if (last !== this) { i = lvl - indexOf.call(all, this) - 1; lvl -= i; all.splice(lvl, all.length); path.splice(lvl - 1, path.length); last = this } if (typeof value === "object" && value) { if (indexOf.call(all, value) < 0) { all.push(last = value) } lvl = all.length; i = indexOf.call(seen, value); if (i < 0) { i = seen.push(value) - 1; if (resolve) { path.push(("" + key).replace(specialCharRG, safeSpecialChar)); mapp[i] = specialChar + path.join(specialChar) } else { mapp[i] = mapp[0] } } else { value = mapp[i] } } else { if (typeof value === "string" && resolve) { value = value.replace(safeSpecialChar, escapedSafeSpecialChar).replace(specialChar, safeSpecialChar) } } } else { doNotIgnore = true } return value } } function retrieveFromPath(current, keys) { for (var i = 0, length = keys.length; i < length; current = current[keys[i++].replace(safeSpecialCharRG, specialChar)]); return current } function generateReviver(reviver) { return function (key, value) { var isString = typeof value === "string"; if (isString && value.charAt(0) === specialChar) { return new $String(value.slice(1)) } if (key === "") value = regenerate(value, value, {}); if (isString) value = value.replace(safeStartWithSpecialCharRG, "$1" + specialChar).replace(escapedSafeSpecialChar, safeSpecialChar); return reviver ? reviver.call(this, key, value) : value } } function regenerateArray(root, current, retrieve) { for (var i = 0, length = current.length; i < length; i++) { current[i] = regenerate(root, current[i], retrieve) } return current } function regenerateObject(root, current, retrieve) { for (var key in current) { if (current.hasOwnProperty(key)) { current[key] = regenerate(root, current[key], retrieve) } } return current } function regenerate(root, current, retrieve) { return current instanceof Array ? regenerateArray(root, current, retrieve) : current instanceof $String ? current.length ? retrieve.hasOwnProperty(current) ? retrieve[current] : retrieve[current] = retrieveFromPath(root, current.split(specialChar)) : root : current instanceof Object ? regenerateObject(root, current, retrieve) : current } var CircularJSON = { stringify: function stringify(value, replacer, space, doNotResolve) { return CircularJSON.parser.stringify(value, generateReplacer(value, replacer, !doNotResolve), space) }, parse: function parse(text, reviver) { return CircularJSON.parser.parse(text, generateReviver(reviver)) }, parser: JSON }; return CircularJSON }(JSON, RegExp);

const x = new MatrizDinamica()
x.agregar(0,1,2)
x.agregar(0,1,3)
x.agregar(0,1,4)
x.agregar(0,1,5)
x.agregar(0,1,6)

let temp = CircularJSON.stringify(x)
console.log(temp);
temp = CircularJSON.parse(temp)
console.log(temp);