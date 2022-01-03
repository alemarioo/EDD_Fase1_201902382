class tablaHash{
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
        this.llenarVacios()
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
            this.hash_table.length = ObtenerSiguientePrimo(this.hash_table.length);
            this.reHash();
            this.InsertarElemento(Objeto)
        }
    }

    reHash(){
        const Nuevatabla = new tablaHash();
        Nuevatabla.hash_table.length = this.hash_table.length

        this.hash_table.forEach(element => {
            Nuevatabla.InsertarElemento(element);
        });
        this.hash_table = Nuevatabla.hash_table
    }

    ObtenerPosicion(Id){
        return Id % this.hash_table.length;
    }

    PorcentajeDeUso(){
        const nuevo = this.hash_table.filter(e=> e.id != "")
        return nuevo.length/this.hash_table.length
    }

}

function esPrimo(numero){
	// Casos especiales
	if (numero == 0 || numero == 1 || numero == 4) return false;
	for (let x = 2; x < numero / 2; x++) {
		if (numero % x == 0) return false;
	}
	// Si no se pudo dividir por ninguno de los de arriba, sí es primo
	return true;
}

function ObtenerSiguientePrimo(numero) {

    while(true){
        numero = numero+1
        if (esPrimo(numero)) return numero
    }
}



const x = new tablaHash()
x.InsertarElemento({id: 3})
x.imprimirTabla()
x.InsertarElemento({id: 1})
x.InsertarElemento({id: 7})
x.InsertarElemento({id: 6})
x.InsertarElemento({id: 5})
x.InsertarElemento({id: 1})
x.InsertarElemento({id: 4})
x.InsertarElemento({id: 1})
x.InsertarElemento({id: 4})
x.InsertarElemento({id: 1})
x.InsertarElemento({id: 4})
x.imprimirTabla()