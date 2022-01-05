class TablaHash{
    constructor() {
        this.hash_table = []
        this.hash_table.length = 7
        this.PORCENTAJE = 0.5;
    }
    
    imprimirTabla(){
        this.hash_table.forEach(element => {
            console.log(element.id);
        });
    }

    llenarVacios(){
        for (let index  = 0; index < this.hash_table.length; index++) {
            if (!this.hash_table[index]) {
                this.hash_table[index] = {id:""};    
            }
            
        }
    }

    InsertarElemento(Objeto){
        this.llenarVacios();
        let posicion = this.ObtenerPosicion(Objeto.id);
        if (this.PorcentajeDeUso() <=  this.PORCENTAJE){
            if(this.hash_table[posicion].id === ""){
                this.hash_table[posicion] = Objeto;
            }else{
                for (let i = 0; i < this.hash_table.length; i++) {
                    posicion = this.ObtenerPosicion(Objeto.id + i**2);
                    const element = this.hash_table[posicion];
                    if (element.id === "") {
                        this.hash_table[posicion] = Objeto;
                        break
                    }
                }
            }
        }else{
            this.hash_table.length = this.ObtenerSiguientePrimo(this.hash_table.length);
            this.reHash();
            this.InsertarElemento(Objeto)
        }
    }

    reHash(){
        const Nuevatabla = new TablaHash();
        Nuevatabla.hash_table.length = this.hash_table.length

        this.hash_table.forEach(element => {
            Nuevatabla.InsertarElemento(element);
        });
        this.hash_table = Nuevatabla.hash_table;
    }

    ObtenerPosicion(Id){
        return Id % this.hash_table.length;
    }

    PorcentajeDeUso(){
        const nuevo = this.hash_table.filter(e=> e.id != "")
        return nuevo.length/this.hash_table.length
    }

    esPrimo(numero){
        // Casos especiales
        if (numero == 0 || numero == 1 || numero == 4) return false;
        for (let x = 2; x < numero / 2; x++) {
            if (numero % x == 0) return false;
        }
        // Si no se pudo dividir por ninguno de los de arriba, sí es primo
        return true;
    }
    
    ObtenerSiguientePrimo(numero) {
    
        while(true){
            numero = numero+1
            if (this.esPrimo(numero)) return numero
        }
    }

    generarDot(){
        let cadena="digraph grafica{\n";
        cadena+="rankdir=LR;\n";
        cadena+="node[shape = box,fillcolor=\"#35858B\" color=\"black\" style=\"filled\"];\n";
        //metodos para graficar el arbol
        
        let tabla = "tabla[shape=none label=<<TABLE BORDER=\"0\" CELLBORDER=\"1\" CELLSPACING=\"0\">";
        let i = 0;
        let nodos = ""
        this.hash_table.forEach(element => {

            //* TABLA GENERAL
            tabla += "<TR><TD PORT=\"f"+element.id+"\">\n"
            if (element.id!=="") {
                tabla += element.id + "<BR/>"+element.vendedor + `<BR/> ${element.cliente}`;

                let aux = element.productos;
                let anterior = "tabla:f"+element.id; 
                while (aux) {
                    nodos+="a"+i.toString()+"_"+aux.id+`[label="${aux.id} \\n ${aux.cantidad} \\n ${aux.nombre} \\n ${aux.precio}"]\n`
                    nodos+=anterior+"->a"+i+"_"+aux.id+"\n"
                    anterior = "a"+i+"_"+aux.id
                    aux = aux.siguiente;
                    
                }

            }else{
                tabla +=  `-VACIO-`;
            }
            tabla += "</TD></TR>\n"
            i++;
        });
        tabla+="</TABLE>>]\n"
        cadena+=tabla;
        cadena+=nodos;
        cadena+="}\n"
        return cadena
    }

    generarDotVendedor(id){
        let cadena="digraph grafica{\n";
        cadena+="rankdir=LR;\n";
        cadena+="node[shape = box,fillcolor=\"#35858B\" color=\"black\" style=\"filled\"];\n";
        let nodos = ""

        this.hash_table.forEach(element => {
            if (element.id === id) {
                if (element.productos) {
                    let aux = element.productos;
                    let anterior = ""; 
                    while (aux) {
                        nodos+="a_"+aux.id+`[label="${aux.id} \\n ${aux.cantidad} \\n ${aux.nombre} \\n ${aux.precio}"]\n`
                        if (anterior!=="") {
                            nodos+=anterior+"->a_"+aux.id+"\n"
                        }
                        anterior = "a_"+aux.id
                        aux = aux.siguiente;   
                    }   
                }
            }
        });
        cadena+=nodos;
        cadena+="}\n"
        return cadena
    }
}

