// const calcularSalario = document.querySelector('#calcular-salario');
// const calcularprestamo = document.querySelector('.calcular-prestamo');

// console.log("entrado a calcular",calcularSalario);

// calcularSalario.addEventListener('click', GetSalario);
// calcularprestamo.addEventListener('click', calcular);
 
 
 
 // https://fincaraiz.com.co/blog/finca-raiz-colombia/credito-hipotecario-que-es-como-funciona/
 function InteresAnual(IPV,days) {
    //IPV = interes
    //interes efectivo anual = (1+IPV)360/Dias - 1
    var pv = 360/30
    return ((1+IPV)**pv) -1
}

function GetSalario() {
    console.log("entrado a calcular");
    let Salario = parseFloat(document.querySelector("input[name=salario]").value);
    let AuxTransport = parseFloat(document.querySelector("input[name=aux_trans]").value);
    let DiasTrabajados = parseFloat(document.querySelector("input[name=dias_trabajados]").value);
    let VerPrestamo = document.getElementById('cuanto_presta')

    var saludEmpleado = Salario*4/100
    var salud_empresa = Salario*8.5/100
    var pesnsion_enpleado = Salario*4/100
    var pension_empresa = Salario*12/100

    var total  = Salario + AuxTransport
    var deducion  = saludEmpleado + pesnsion_enpleado
    // var neto_deducido =total - deducion
    // console.log({saludEmpleado,pesnsion_enpleado,total,deducion,neto_deducido})

    var aporte_cesantias = Salario + AuxTransport/12
    var aporte_cesantias2 = (Salario*DiasTrabajados)/360
    var interes_cesantias = aporte_cesantias2*12/100
    var prima_dias = DiasTrabajados/2
    var prima_mitad= total*prima_dias/360
    salrio_deducido = total - deducion
    var cal_deuda = calcularDeuda(salrio_deducido)

    document.querySelector('#aport_salud').innerHTML = saludEmpleado.toLocaleString("es-CO", {minimumFractionDigits: 2, maximumFractionDigits:2})+" COPS"
    document.querySelector('#pension').innerHTML = pesnsion_enpleado.toLocaleString("es-CO", {minimumFractionDigits: 2, maximumFractionDigits:2})+" COPS"
    document.querySelector('#neto').innerHTML = (total - deducion).toLocaleString("es-CO", {minimumFractionDigits: 2, maximumFractionDigits:2})+" COPS"
    document.querySelector('#prima').innerHTML = prima_mitad.toLocaleString("es-CO", {minimumFractionDigits: 2, maximumFractionDigits:2})+" COPS"
    document.querySelector('#int_cesantias').innerHTML = interes_cesantias.toLocaleString("es-CO", {minimumFractionDigits: 2, maximumFractionDigits:2})+" COPS"
    if(salrio_deducido){
        VerPrestamo.style.display = "block"
    }else{
        VerPrestamo.style.display = "none"
    }

}
    function calcularDeuda(salario) {
        var salario_devengar = salario * 30 / 100
        var deuda = (salario - salario_devengar) * 45
        document.querySelector("input[name=importe]").value = deuda
        console.log("deuda>>",deuda)

    }
    function calcular() {
        let deuda=parseFloat(document.querySelector("input[name=importe]").value);
        let anos=parseInt(document.querySelector("input[name=anos]").value);
        let interes=parseFloat(document.querySelector("input[name=interes]").value);
        const resultado=document.getElementById("resultado");
        document.getElementById('ver_tabla').style.display = "block"




        // hacemos los calculos...
        var valorInteres = interes/100
        interes=(interes/100)/12;
        const m=(deuda*interes*(Math.pow((1+interes),(anos*12))))/((Math.pow((1+interes),(anos*12)))-1);

        var termDays = anos * 12 * 30.42
        var Months = anos * 12  //* -1.0;

        var EA = (InteresAnual(valorInteres)*100).toFixed(2)

        var pagoTotalInt = 0
        document.querySelector('#interes_ea').innerHTML =EA
        document.querySelector('#capital').innerHTML = deuda.toLocaleString("es-CO", {minimumFractionDigits: 2, maximumFractionDigits:2})+" COP"
        document.querySelector('#cuota').innerHTML = m.toLocaleString("es-CO", {minimumFractionDigits: 2, maximumFractionDigits:2})+" COP"
        document.querySelector('#total_interes').innerHTML = pagoTotalInt
        const table=document.createElement("table");
        table.setAttribute("border",1);
        table.setAttribute("cellpadding",5);
        table.setAttribute("cellspacing",0);

        // titulo de la tabla
        let tr=document.createElement("tr");
        for (let text of ["Mes", "Intereses", "Amortización", "Capital Pendiente"]) {
            let th=document.createElement("th");
            let txt=document.createTextNode(text);
            th.appendChild(txt);
            tr.appendChild(th);
        }
        table.appendChild(tr);

        // contenido de la tabla
        let totalInt=0;
        for (let i=1; i<=anos*12; i++) {
            totalInt=totalInt+(deuda*interes);

            tr=document.createElement("tr");
            let td=document.createElement("td");
            let txt=document.createTextNode(i);
            td.appendChild(txt);
            tr.appendChild(td);
            td=document.createElement("td");
            txt=document.createTextNode((deuda*interes).toLocaleString("es-CO", {minimumFractionDigits: 2, maximumFractionDigits:2}));
            td.appendChild(txt);
            tr.appendChild(td);
            td=document.createElement("td");
            txt=document.createTextNode((m-(deuda*interes)).toLocaleString("es-CO", {minimumFractionDigits: 2, maximumFractionDigits:2}));
            td.appendChild(txt);
            tr.appendChild(td);
            deuda=deuda-(m-(deuda*interes));
            td=document.createElement("td");
            if (deuda<0) {
                txt=document.createTextNode("0");
            }else{
                txt=document.createTextNode(deuda.toLocaleString("es-CO", {minimumFractionDigits: 2, maximumFractionDigits:2}));
            }
            td.appendChild(txt);
            tr.appendChild(td);
            table.appendChild(tr);
        }

        resultado.appendChild(table);
        document.querySelector('#total_interes').innerHTML = totalInt.toLocaleString("es-CO", {minimumFractionDigits: 2, maximumFractionDigits:2})+" COP"

    }