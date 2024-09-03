// Por lo general se utiliza cuando existen multiples comportamientos para una misma accion
const CONTENEDOR = document.getElementById("claseEjemplo");

class ventaContexto{
    constructor(estrategia){
        this.estrategia = estrategia;
    }
    // Crear una forma de setear una nueva estrategia cada que se necesite
    setEstrategia(estrategia){
        this.estrategia = estrategia;
    }
    // Nuestra estrategia se vera obligada a implementar el metodo calcular
    calcular(monto){
        return this.estrategia.calcular(monto);
    }
}

// Con esta estructura podemos crear multiples estrategias
class ventaRegularEstrategia{
    constructor(impuesto){
        this.impuesto = impuesto;
    }
    calcular(monto){
        return monto + (monto * this.impuesto);
    }
}
// Nuevo calculo que maneje descuento e impuesto
class ventaDescuentoImpuestoEstrategia{
    constructor(impuesto, descuento){
        this.impuesto = impuesto;
        this.descuento = descuento;
    }
    calcular(monto){
        return (monto + (monto * this.impuesto)) - this.descuento;
    }
}
//! inicio de codigo
const venaRegular = new ventaRegularEstrategia(0.16 /*IVA*/);
const ventaDescuentoImpuesto = new ventaDescuentoImpuestoEstrategia(0.16 /*IVA*/, 5 /*Descuento bruto*/);
const venta = new ventaContexto(venaRegular);

CONTENEDOR.innerHTML += `<label>Venta Regular (10+IVA16%)=${Number(venta.calcular(10/*Monto de la venta */))}</label><br>`;
venta.setEstrategia(ventaDescuentoImpuesto);
CONTENEDOR.innerHTML += `<label>Venta Descuento (10+IVA16%-5peso)=${Number(venta.calcular(10/*Monto de la venta */))}</label><br>`;

//!------------------ Caso real ------------------!//
class ReporteContexto{
    constructor(estrategia, data, elemento){
        this.setEstrategia(estrategia);
        this.data = data;
        this.elemento = elemento;
    }
    setEstrategia(estrategia){
        this.estrategia = estrategia;
    }
    mostrarHtml(){ //! Toda estrategia debera tener este metodo
        this.estrategia.mostrarHtml(this.data, this.elemento);
    }
}
class VacioEstrategia{
    mostrarHtml(data, elemento){
        elemento.innerHTML = "";
    }
}
class ListaEstrategia{
    mostrarHtml(data, elemento){
        elemento.innerHTML = data.reduce((AX, item)=>{
            return AX + `<div>
                    <h2>${item.name}</h2> 
                    <p>${item.country}<p>
                </div>
            <hr>`;
        }, ""/*valor inicial*/);
    }
}
class ListaDetalladaEstrategia{
    mostrarHtml(data, elemento){
         elemento.innerHTML = data.reduce((AX, item)=>{
            return AX + `<div>
                    <h2>${item.name}</h2> 
                    <p>${item.country}<p>
                    <p>${item.info}</p>
                </div>
            <hr>`;
        }, ""/*valor inicial*/);
    }
}
class ListaConImagenEstrategia{
    mostrarHtml(data, elemento){
        elemento.innerHTML = data.reduce((AX, item)=>{
                return AX + `<div>
                        <h2>${item.name.toUpperCase()}</h2> 
                        <p>${item.country}<p>
                        <p>${item.info}</p>
                        <img width="10%" src="${item.img}" alt="${item.name}">
                    </div>
                <hr>`;
        }, ""/*valor inicial*/);
    }
}

const data = [{
    name: "Erdinger Pikantus",
    country: "Alemania",
    info: "Erdinger Pikantus es una cerveza de estilo weizenbock elaborada en la localidad bávara de Erding.",
    img: "https://dxjcdxuv6chk2.cloudfront.net/assets/biere/flascheglas/pikantus-2020-v2.png"
},
{
    name: "Corona",
    country: "México",
    info: "La cerveza Corona es una marca mundialmente conocida, distribuida a lo largo de más de 159 países en los cinco continentes.",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Corona-6Pack.JPG"
},
{
    name: "Delirium Tremens",
    country: "Bélgica",
    info: "Esta pale ale tiene una efervescencia fina con un toque un tanto picante. Al tomarse, calienta el paladar y deja un sabor fuerte y de un amargor seco.",
    img: "https://www.delirium.be/themes/custom/delirium/assets/img/beers/beer_delirium_tremens_bottle.png"
}];

const listaEstrategias = [
    new VacioEstrategia(),
    new ListaEstrategia(),
    new ListaDetalladaEstrategia(),
    new ListaConImagenEstrategia()
];
const contenedorReporte = document.getElementById("contenido");
const selectReportes = document.getElementById("tipos_lista");
selectReportes.value = "0";
const infoReporte = new ReporteContexto(new VacioEstrategia(), data, contenedorReporte);

infoReporte.mostrarHtml();

selectReportes.addEventListener("change",(event)=>{
    const tipoSeleccionado = event.target.value; // item seleccionado en select
    infoReporte.setEstrategia(listaEstrategias[tipoSeleccionado]);
    infoReporte.mostrarHtml();
});
