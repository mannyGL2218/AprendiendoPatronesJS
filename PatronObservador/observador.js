class Sujeto{
    constructor(){
        this.observers = [];
    }

    subscribe(observer){
        this.observers.push(observer);
    }

    unsubscribe(observer){
        this.observers = this.observers.filter(obs => obs != observer);
    }

    notify(data){
        this.observers.forEach(observador=>{
            observador.actualizar(data);
        });
    }
}
class Observador{
    constructor(unaAccion){
        this.accion = unaAccion
    }
    actualizar(data){
        this.accion(data);
    }
}

const INPUT = document.getElementById("inp_texto");
const DIV_1 = document.getElementById("div1");
const DIV_2 = document.getElementById("div2");

const sujeto = new Sujeto();
const observer1= new Observador((d)=>console.log("Hola soy el observador 1 "+d));
const observer2= new Observador((d)=>{
    DIV_1.innerHTML = d;
});
const observer3= new Observador((d)=>{
    DIV_2.innerHTML = d.split("").reverse().join("");
});

sujeto.subscribe(observer1);
sujeto.subscribe(observer2);
sujeto.subscribe(observer3);
sujeto.unsubscribe(observer1);

function inputOnChange(){
    sujeto.notify(INPUT.value);
}