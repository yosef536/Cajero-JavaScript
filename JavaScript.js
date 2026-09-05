
// Objeto para guardar la cuenta creada
let usuarioRegistrado = null;
let passwordRegistrada = null;
let correoRegistrado = null;
let identificacionRegistrada = null;
let menu = true;

alert("Bienvenido a , Mi Plata, el mejor banco del mundo")

let erroresCasoDos = 0; // ---> contador de errores

while (menu) {

    let opcion = prompt(`
        -----------------------
            Menú: 
            1. Registrarse 
            2. Iniciar sesión
                ------
            --Elige 1 o 2--
        -----------------------`);
    if (opcion === null) { // ---> si cierra la pestaña 
        break;
    }

    switch (opcion) {

        case "1":     // Registro

            //Guardado en LocalStorage

            localStorage.setItem("nombre", usuarioRegistrado = prompt("Crea tu nombre de usuario:"));
            localStorage.setItem("contraseña", passwordRegistrada = prompt("Crea tu contraseña:"));
            localStorage.setItem("correo", correoRegistrado = prompt("Crea tu correo:"));
            localStorage.setItem("id", identificacionRegistradaRegistrada = prompt("Digita tu identificacion:"));

            alert("¡Registro exitoso!");
            break;

        case "2":     // Inicio de sesión

            let ingresoUser = prompt("Ingresa tu usuario:");
            let ingresoPass = prompt("Ingresa tu contraseña:");

            //obtener datos de localStorage
            if (ingresoUser === localStorage.getItem("nombre") && ingresoPass === localStorage.getItem("contraseña")) {
                alert("¡Bienvenido, " + localStorage.getItem("nombre") + "!");
                menuCuenta(); //  ----> llamar la funcion menu usuario
            } else {
                erroresCasoDos += 1; // ---> contador

                alert("Datos incorrectos. Intenta de nuevo.");
                alert("Llevas " + erroresCasoDos + " error(es).");

                //bloqueo a los 3 errores
                if (erroresCasoDos >= 3) {
                    alert("Cuenta bloqueada por 24 horas, comunícate con tu banco")
                    break;
                }
            }
            break;
        default:
            alert("Opción no válida. Elige 1 o 2 ");
            break;
    }
}
//--------------------------------------- Menu de cuenta -----------------------------------------------------

function menuCuenta() {
    let dentro = true;
    let dineroCuenta = 0; //-------> declaro esta variable fuera del while para que se puede usar en todos los casos
    let movimientos = []; // ---> array para guardar procesos

    while (dentro) {
        let opcionCuenta = prompt(`
            -----------------------
                Menú de cuenta:
                1. Consignar
                2. Consultar saldo
                3. Retirar
                4. Consultar Movimientos
                5. Salir
            -----------------------`);

        if (opcionCuenta === null) { // ---> si cierra la pestaña retorna a menu
            dentro = false;
            break;
        }

        switch (opcionCuenta) {
            case "1":
                consignar() // ---> llama funcion
                break;

            case "2":
                consultarSaldo() // ---> llama funcion
                break;

            case "3":
                retirar()
                break;

            case "4":
                consultarMovimientos() // ---> llama funcion
                break;

            case "5":
                salir()
                break;
            default:
                alert("Opción no válida."); // ---> llama funcion
                break;
        }
    }

    //-------------- funciones ----------------------

    // 1. Consignar
    function consignar() {
        let consDinero = Number(prompt("Digite cuánto quiere consignar"))

        dineroCuenta += consDinero; // ---> Acumulador

        if (dineroCuenta >= 1000000) {
            alert("Tu saldo actual es de: " + dineroCuenta + " de " + "pesos");
        } else {
            alert("Tu saldo actual es de: " + dineroCuenta + " pesos");
        }

        if (consDinero < 0) {
            alert("El monto a consignar no puede ser un numero negativo")
        } else {
            if (consDinero === 0) {
                alert("No hay un valor para consignar")

                // paso del caso 4
            } else {
                movimientos.push({ // ---> agregar valores al array 
                    fecha: new Date().toLocaleString(), // ---> muestra la hora actual y la guarda en el localStorage
                    tipo: "Consignación",
                    monto: consDinero
                });
            }
        }
    }
    // 2. Consultar saldo
    function consultarSaldo() {
        if (dineroCuenta >= 1000000) {
            alert("Tu saldo actual es de: " + dineroCuenta + " de " + "pesos");
        } else {
            alert("Tu saldo actual es de: " + dineroCuenta + " pesos");
        }
    }
    // 3. Retirar
    function retirar() {
        let montoRetirar = Number(prompt("Digite la cantidad de dinero que quiere retirar"));
        
        // validacion 
        if (dineroCuenta < montoRetirar) {
            alert("El monto a retirar es mayor al dinero de la cuenta");
        } else {
            if (montoRetirar === 0) {   // validacion de retiro = 0
                alert("Digita una cantidad mayor a 0")
            } else {
                if (montoRetirar < 0) {
                    alert("No son validos valores negativos") // validacion de retiro < -0
                } else {
                    dineroCuenta = dineroCuenta - montoRetirar;
                    alert("Retiro completado con exito")
                    alert("Tu saldo actual es: $" + dineroCuenta + " pesos");

                    // parte del 4 caso
                    movimientos.push({ // ---> agregar valores al array 
                        fecha: new Date().toLocaleString(), // ---> muestra la hora actual 
                        tipo: "Retiro",
                        monto: montoRetirar
                    });
                }
            }
        }
    }
    //4 Consultar Movimientos
    function consultarMovimientos() {
        if (movimientos.length === 0) {
            alert("No hay movimientos registrados todavía.");
            return;
        }

        let historial = "----- Historial de Movimientos -----\n";
        for (let i = 0; i < movimientos.length; i++) { // ---> el for recorre el array
            let mov = movimientos[i];
            historial += `${i + 1}. \n Fecha: [${mov.fecha}] \n Tipo: ${mov.tipo} \n Monto: ${mov.monto} pesos\n`; // fecha, tipo, monto
        }
        alert(historial);
    }

    //5 salir
    function salir() {
        alert("Cerrando sesión...");
        dentro = false;
        return menu
    }
}    