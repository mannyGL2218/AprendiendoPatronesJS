//!----------------- Caso De ejemplo -----------------!//
class Singleton {
	constructor() {
		//* Generar un Numero aleatorio para comprobar que es la misma instancia
		this.random = Math.random();
		//? Si ya existe una instancia de Singleton, regresar esa instancia
		if (Singleton.instance) {
			return Singleton.instance;
		}
		//? Caso contrario, crear la instancia
		Singleton.instance = this;
	}
}

const instancia1 = new Singleton();
const instancia2 = new Singleton();

const contenedor = document.getElementById("claseEjemplo");
const span1 = `<span>El valor de la primera instancia es ${instancia1.random}! :D</span>`;
const span2 = `<span>El valor de la primera instancia es ${instancia2.random}! :D</span>`;

contenedor.innerHTML += span1 + `<br>` + span2;