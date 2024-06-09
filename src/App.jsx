/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'

// OBJETOS PERMANENTES {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}}
class Surtidor {
  static colaComun = [];

  constructor() {
    this.estado = 'Libre';
    this.finAtenciónCombustible
  }

  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }
  cambiarFinAtencionCombustible(nuevoFinAtención) {
    this.finAtenciónCombustible = nuevoFinAtención;
  }
}

class Lavadero {
  static colaComun = [];

  constructor() {
    this.estado = 'Libre';
    this.finAtenciónLavadero
  }
  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }
  cambiarFinAtencionLavadero(nuevoFinAtención) {
    this.finAtenciónLavadero = nuevoFinAtención;
  }
}

class MantenimientoRapido {
  static colaComun = [];

  constructor() {
    this.estado = 'Libre';
    this.finAtenciónMantenimiento
  }
  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }
  cambiarFinAtencionMantenimiento(nuevoFinAtención) {
    this.finAtenciónMantenimiento = nuevoFinAtención;
  }
}

class Cajero {
  static colaComun = [];

  constructor() {
    this.estado = 'Libre';
    this.finAtenciónCajero
  }
  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }
  cambiarFinAtencionCajero(nuevoFinAtención) {
    this.finAtenciónCajero = nuevoFinAtención;
  }
}

class Kiosco {
  static colaComun = [];

  constructor() {
    this.estado = 'Libre';
    this.finAtenciónKiosco
  }
  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }
  cambiarFinAtencionKiosco(nuevoFinAtención) {
    this.finAtenciónKiosco = nuevoFinAtención;
  }
}

// CLIENTE - OBJETO TEMPORAL {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}}
class Cliente {
  constructor() {
    this.estado = ''; // Estado inicial: Esperando atención surtidor
    this.horaLlegada = null;
    this.posicionLlegada = null;
    this.servidorEnElQueEsta = null;
    this.horaFinAtencion = null;
  }

  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }
  cambiarHoraLlegada(nuevoHoraLlegada) {
    this.horaLlegada = nuevoHoraLlegada;
  }
  cambiarPosicionLlegada(nuevaPosicionLlegada) {
    this.posicionLlegada = nuevaPosicionLlegada;
  }
  cambiarServidorEnElQueEsta(nuevoServidorEnElQueEsta) {
    this.servidorEnElQueEsta = nuevoServidorEnElQueEsta;
  }
  cambiarHoraFinAtencion(nuevaHoraFinAtencion) {
    this.horaFinAtencion = nuevaHoraFinAtencion;
  }
}

const estados = [
  'EAS', // Esperando atención surtidor
  'SAS', // Siendo atendido en surtidor
  'EAL', // Esperando atención lavado
  'SAL', // Siendo atendido en lavadero
  'EAM', // Esperando atención en mantenimiento
  'SAM', // Siendo atendido en mantenimiento
  'EAC', // Esperando atención en caja
  'SAC',  // Siendo atendido en caja
  'EAK', // Esperando atención en caja
  'SAK'  // Siendo atendido en caja
];


function App() {
  // PARAMETRIZABLES {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}}
  const [valoresFormulario, setValoresFormulario] = useState({
    lineasASimular: 2,
    lineaAVisualizar: 1,
    tasaAtencionSurtidor: 20,
    tasaAtencionLavadero: 10,
    tasaAtencionMantenimiento: 5,
    tasaAtencionCajero: 15,
    tasaAtencionKiosco: 30,
    tasaLlegadaCombustible: 30,
    tasaLlegadaLavadero: 15,
    tasaLlegadaMantenimiento: 10,
    tasaLlegadaCajero: 40
  });

  const [tiempoDeAtencion, setTiempoDeAtencion] = useState({
    combustible: 1 / valoresFormulario.tasaAtencionSurtidor,
    lavadero: 1 / valoresFormulario.tasaAtencionLavadero,
    mantenimiento: 1 / valoresFormulario.tasaAtencionMantenimiento,
    caja: 1 / valoresFormulario.tasaAtencionCajero,
    kiosco: 1 / valoresFormulario.tasaAtencionKiosco
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValoresFormulario({
      ...valoresFormulario,
      [name]: value
    });
  };

  const [mostrarTablas, setMostrarTablas] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    setTiempoDeAtencion({
      combustible: 1 / valoresFormulario.tasaAtencionSurtidor,
      lavadero: 1 / valoresFormulario.tasaAtencionLavadero,
      mantenimiento: 1 / valoresFormulario.tasaAtencionMantenimiento,
      caja: 1 / valoresFormulario.tasaAtencionCajero,
      kiosco: 1 / valoresFormulario.tasaAtencionKiosco
    })

    generarTabla();
    setMostrarTablas(true);
  };

  

  // SURTIDOR {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}}
  const [surtidores, setSurtidores] = useState([
    new Surtidor(),
    new Surtidor(),
    new Surtidor(),
    new Surtidor()
  ]);

  const agregarClienteAColaSurtidor = (cliente) => {
    Surtidor.colaComun.push(cliente);
    setSurtidores([...surtidores]); // Trigger re-render
  };

  const cambiarEstadoSurtidor = (index) => {
    const nuevosSurtidores = [...surtidores];
    nuevosSurtidores[index].estado = nuevosSurtidores[index].estado === 'Libre' ? 'Ocupado' : 'Libre';
    setSurtidores(nuevosSurtidores);
  };

  // LAVADEROS {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}}
  const [lavaderos, setLavaderos] = useState([
    new Lavadero(),
    new Lavadero()
  ]);

  const agregarClienteColaLavadero = (cliente) => {
    Lavadero.colaComun.push(cliente);
    setLavaderos([...lavaderos]); // Trigger re-render
  };

  const cambiarEstadoLavadero = (index) => {
    const nuevosLavaderos = [...lavaderos];
    nuevosLavaderos[index].estado = nuevosLavaderos[index].estado === 'Libre' ? 'Ocupado' : 'Libre';
    setLavaderos(nuevosLavaderos);
  };

  // MANTENIMIENTO {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}}
  const [mantenimientos, setMantenimientos] = useState([
    new MantenimientoRapido(),
    new MantenimientoRapido()
  ]);

  const agregarClienteAColaMantenimiento = (cliente) => {
    MantenimientoRapido.colaComun.push(cliente);
    setMantenimientos([...mantenimientos]); // Trigger re-render
  };

  const cambiarEstadoMantenimientos = (index) => {
    const nuevosMantenimientos = [...mantenimientos];
    nuevosMantenimientos[index].estado = nuevosMantenimientos[index].estado === 'Libre' ? 'Ocupado' : 'Libre';
    setMantenimientos(nuevosMantenimientos);
  };

  // CAJERO {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}}
  const [cajeros, setCajeros] = useState([
    new Cajero(),
    new Cajero()
  ]);

  const agregarClienteColaCajero = (cliente) => {
    Cajero.colaComun.push(cliente);
    setCajeros([...cajeros]); // Trigger re-render
  };

  const cambiarEstadoCajeros = (index) => {
    const nuevosCajeros = [...cajeros];
    nuevosCajeros[index].estado = nuevosCajeros[index].estado === 'Libre' ? 'Ocupado' : 'Libre';
    setCajeros(nuevosCajeros);
  };

  // KIOSCO {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}}
  const [kioscos, setKioscos] = useState([
    new Kiosco(),
  ]);

  const agregarClienteColaKiosco = (cliente) => {
    Kiosco.colaComun.push(cliente);
    setKioscos([...kioscos]); // Trigger re-render
  };

  const cambiarEstadoKioscos = (index) => {
    const nuevosKioscos = [...kioscos];
    nuevosKioscos[index].estado = nuevosKioscos[index].estado === 'Libre' ? 'Ocupado' : 'Libre';
    setKioscos(nuevosKioscos);
  };



  // CLIENTE {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}}
  const [clientes, setClientes] = useState([]);

  const agregarCliente = () => {
    const nuevoCliente = new Cliente();
    setClientes([...clientes, nuevoCliente]);
  };

  const cambiarEstadoCliente = (index, nuevoEstado) => {
    const nuevosClientes = [...clientes];
    nuevosClientes[index].cambiarEstado(nuevoEstado);
    setClientes(nuevosClientes);
  };


  // VECOTRES PARA TABLA {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}}
  // EVENTO
  const [evento, setEvento] = useState('Inicialización');

  // RELOJ
  const [reloj, setReloj] = useState(0);

  // LLEGADA CLIENTE COMBUSTIBLE
  const [llegadaClienteCombustible, setllegadaClienteCombustible] = useState({
    RND: 0,
    tiempoEntreLLegadas: 0,
    proximaLlegada: 0
  });
  // LLEGADA CLIENTE LAVADERO
  const [llegadaClienteLavadero, setllegadaClienteLavadero] = useState({
    RND: 0,
    tiempoEntreLLegadas: 0,
    proximaLlegada: 0
  });
  // LLEGADA CLIENTE MANTENIMIENTO
  const [llegadaClienteMantenimiento, setllegadaClienteMantenimiento] = useState({
    RND: 0,
    tiempoEntreLLegadas: 0,
    proximaLlegada: 0
  });
  // LLEGADA CLIENTE CAJA
  const [llegadaClienteCaja, setllegadaClienteCaja] = useState({
    RND: 0,
    tiempoEntreLLegadas: 0,
    proximaLlegada: 0
  });


  // SIMULACIÓN {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}}
  const [tablaDeSimulacion, setTablaDeSimulacion] = useState([])


  // const calcularProximaLlegadaAServicio = (tasaLlegadaServicio) => {
  //   const llegadaClienteServicioRND = parseFloat(Math.random())
  //   const llegadaClienteServicioTiempoEntreLlegadas = -1/valoresFormulario[tasaLlegadaServicio] * Math.log(1-llegadaClienteServicioRND)
    
  //   // setllegadaClienteCombustible({
  //   //   RND: llegadaClienteCombustibleRND,
  //   //   tiempoEntreLLegadas: llegadaClienteCombustibleTiempoEntreLlegadas,
  //   //   proximaLlegada: reloj + llegadaClienteCombustibleTiempoEntreLlegadas
  //   // })
  //   return [llegadaClienteServicioRND, llegadaClienteServicioTiempoEntreLlegadas]
  // }

  const encontrarProxHoraImportante = (obj) => {
    let proxNombre = null;
    let proxReloj = Infinity;
  
    for (const [nombre, valor] of Object.entries(obj)) {
      if (valor && valor < proxReloj) {
        proxReloj = valor;
        proxNombre = nombre;
      }
    }
  
    return { proxNombre, proxReloj };
  };

  const agregarClienteAServicio = (listaServicio, nombreClase, clase, setLista, horaFinAtencion, horaActual, finAtencionString) => {
    let servicioLibreIndex = -1;

    // Buscar el primer equipo del servicio libre
    for (let i = 0; i < listaServicio.length; i++) {
      if (listaServicio[i].estado === 'Libre') {
        servicioLibreIndex = i;
        break;
      }
    }
    
    const nuevoCliente = new Cliente();

    if (servicioLibreIndex !== -1) { // Si hay un equipo del Servicio libre
      listaServicio[servicioLibreIndex].cambiarEstado('Ocupado');
      nuevoCliente.cambiarEstado(`SA${nombreClase}-${servicioLibreIndex + 1}`);
      nuevoCliente.cambiarHoraFinAtencion(horaFinAtencion.toFixed(4));
      // console.log(`**** servicioLibreIndex: ${servicioLibreIndex}`)
      nuevoCliente.cambiarServidorEnElQueEsta(servicioLibreIndex)
    } else { // Si todos los equipos del Servicio están ocupados
      nuevoCliente.cambiarEstado(`EA${nombreClase}`);
    }

    nuevoCliente.cambiarPosicionLlegada(clase.colaComun.length);
    nuevoCliente.cambiarHoraLlegada(horaActual);

    clase.colaComun.push(nuevoCliente);
    setClientes([...clientes, nuevoCliente]);
    setLista([...listaServicio]); // Trigger re-render

    // console.log(clase.colaComun)
    // console.log(servicioLibreIndex)
    return servicioLibreIndex
  };


  const finAtencionServicio = (clase, nombreServicio, indiceServicio, reloj, servicios, tasaAtencionServicio) => {
    let horaFin 
    
    // console.log(nombreServicio)
    // console.log(indiceServicio)
    // console.log(servicios)
    // console.log(clase.colaComun)

    // Encuentra el índice del cliente en la cola del servicio
    const indiceClienteEliminadoServicio = clase.colaComun.findIndex(cliente => cliente.horaFinAtencion === reloj);
    // console.log('-----------------')
    // console.log(reloj)
    // console.log(clase.colaComun.map((cl) => cl))
    // console.log('-----------------')
    // console.log(`Reloj: ${reloj}`, `Serv: ${nombreServicio}`, `IndexS: ${indiceServicio}`, `IndexCl: ${indiceClienteEliminadoServicio}`);
    
    if(indiceClienteEliminadoServicio < 0) {
      return horaFin
    }

    // Elimina el cliente de la cola del servicio
    const clienteEliminado = clase.colaComun.splice(indiceClienteEliminadoServicio, 1)[0];
    // console.log(clienteEliminado)

    // const indiceClienteEliminadoClientes = clientes.findIndex(cliente => cliente.horaFinAtencion === reloj);
    // console.log(indiceClienteEliminadoClientes)
    clienteEliminado.cambiarEstado('')
    clienteEliminado.cambiarHoraLlegada('')
    clienteEliminado.cambiarPosicionLlegada('')
    clienteEliminado.cambiarServidorEnElQueEsta('')
    clienteEliminado.cambiarHoraFinAtencion('')
    // // Destruye el cliente (puede ser simplemente eliminando su referencia)
    // clienteEliminado = null;

    servicios[indiceServicio-1].cambiarEstado('Libre')
  
    // // Actualiza horasImportantes
    // horasImportantes[`finAtencion${nombreServicio}${indiceServicio - 1}`] = null;
    
    // // Verifica si hay más clientes en la cola común que servicios disponibles
    // console.log(reloj)
    // console.log(clase.colaComun)
    // console.log(clase.colaComun.length)
    // console.log(servicios)
    // console.log(servicios.length)

    if (clase.colaComun.length > servicios.length) {
      // Encuentra el índice del servicio libre
      // const servicioLibreIndex = servicios.findIndex(servicio => servicio.estado === 'Libre');
      // console.log(`reloj: ${reloj}`, `servicioLibreIndex: ${servicioLibreIndex}`)

      // if (servicioLibreIndex !== -1) {
        // Mueve al siguiente cliente de la cola al servicio libre
        const siguienteCliente = clase.colaComun.find(cliente => !cliente.horaFinAtencion)
        servicios[indiceServicio-1].cambiarEstado('Ocupado');
        siguienteCliente.cambiarEstado(`SA${nombreServicio}-${indiceServicio-1}`)
        siguienteCliente.cambiarServidorEnElQueEsta(indiceServicio-1)
        horaFin = parseFloat((parseFloat(reloj) + parseFloat(1/tasaAtencionServicio)).toFixed(4))
        console.log("HORA FINN: ", horaFin)
        siguienteCliente.cambiarHoraFinAtencion(horaFin) // Actualiza con el tiempo correspondiente
        
        // Asigna el fin de atención al servicio correspondiente
        // horasImportantes[`finAtencion${nombreServicio}${servicioLibreIndex + 1}`] = tiempoFinAtencion;
        // }
        }
        
      console.log("HORA FINN: ", horaFin)
    return horaFin;
  };
  
  
  const generarTabla = () => {
    const tabla = [];

    let evento = 'Inicialización'
    let reloj = 0

    const horasImportantes = {
      llegadaClienteCombustible: 0,
      llegadaClienteLavadero: 0,
      llegadaClienteMantenimiento: 0,
      llegadaClienteCaja: 0,
  
      llegadaClienteKiosco: null,
      // proxLlegadaKisoco: 0,
  
      finAtencionKiosco1: null,
      finAtencionCombustible1: null,
      finAtencionCombustible2: null,
      finAtencionCombustible3: null,
      finAtencionCombustible4: null,
      finAtencionLavadero1: null,
      finAtencionLavadero2: null,
      finAtencionMantenimiento1: null,
      finAtencionMantenimiento2: null,
      finAtencionCaja1: null,
      finAtencionCaja2: null
    }
    
    for(var i = 0; i < valoresFormulario.lineasASimular; i++){
      let llegadaClienteCombustibleRND
      let llegadaClienteCombustibleTiempoEntreLlegadas

      let llegadaClienteLavaderoRND
      let llegadaClienteLavaderoTiempoEntreLlegadas

      let llegadaClienteMantenimientoRND
      let llegadaClienteMantenimientoTiempoEntreLlegadas

      let llegadaClienteCajaRND
      let llegadaClienteCajaTiempoEntreLlegadas

      let rndVaKiosco

      if(i == 0){
        // setEvento('Inicialización')
        // setReloj(0)
        evento = 'Inicialización'
        reloj = 0

        // COMBUSTIBLE
        // llegada_cliente_combustible
        llegadaClienteCombustibleRND = parseFloat(Math.random())
        llegadaClienteCombustibleTiempoEntreLlegadas = -1/valoresFormulario.tasaLlegadaCombustible * Math.log(1-llegadaClienteCombustibleRND)
        horasImportantes.llegadaClienteCombustible = reloj + llegadaClienteCombustibleTiempoEntreLlegadas
        // setllegadaClienteCombustible({
        //   RND: llegadaClienteCombustibleRND,
        //   tiempoEntreLLegadas: llegadaClienteCombustibleTiempoEntreLlegadas,
        //   proximaLlegada: reloj + llegadaClienteCombustibleTiempoEntreLlegadas
        // })

        // LAVADERO
        // llegada_cliente_lavado
        llegadaClienteLavaderoRND = parseFloat(Math.random())
        llegadaClienteLavaderoTiempoEntreLlegadas = -1/valoresFormulario.tasaLlegadaLavadero * Math.log(1-llegadaClienteLavaderoRND)
        horasImportantes.llegadaClienteLavadero = reloj + llegadaClienteLavaderoTiempoEntreLlegadas
        // setllegadaClienteLavadero({
        //   RND: llegadaClienteLavaderoRND,
        //   tiempoEntreLLegadas: llegadaClienteLavaderoTiempoEntreLlegadas,
        //   proximaLlegada: reloj + llegadaClienteLavaderoTiempoEntreLlegadas
        // })

        // MANTENIMIENTO
        // llegada_cliente_mantenimiento
        llegadaClienteMantenimientoRND = parseFloat(Math.random())
        llegadaClienteMantenimientoTiempoEntreLlegadas = -1/valoresFormulario.tasaLlegadaMantenimiento * Math.log(1-llegadaClienteMantenimientoRND)
        horasImportantes.llegadaClienteMantenimiento = reloj + llegadaClienteMantenimientoTiempoEntreLlegadas
        // setllegadaClienteMantenimiento({
        //   RND: llegadaClienteMantenimientoRND,
        //   tiempoEntreLLegadas: llegadaClienteMantenimientoTiempoEntreLlegadas,
        //   proximaLlegada: reloj + llegadaClienteMantenimientoTiempoEntreLlegadas
        // })

        // CAJA
        // llegada_cliente_caja
        llegadaClienteCajaRND = parseFloat(Math.random())
        llegadaClienteCajaTiempoEntreLlegadas = -1/valoresFormulario.tasaLlegadaCajero * Math.log(1-llegadaClienteCajaRND)
        horasImportantes.llegadaClienteCaja = reloj + llegadaClienteCajaTiempoEntreLlegadas
        // setllegadaClienteCaja({
        //   RND: llegadaClienteCajaRND,
        //   tiempoEntreLLegadas: llegadaClienteCajaTiempoEntreLlegadas,
        //   proximaLlegada: reloj + llegadaClienteCajaTiempoEntreLlegadas
        // })

        
        const estadosSurtidores = surtidores.map((surtidor) => surtidor.estado);
        tabla.push({
          evento: evento,
          reloj: 0,
  
          rndLlegadaCombustible: parseFloat(llegadaClienteCombustibleRND.toFixed(4)),
          tiempoEntreLlegadasCombustible: parseFloat(llegadaClienteCombustibleTiempoEntreLlegadas.toFixed(4)),
          proximaLlegadaCombustible: parseFloat(reloj) + parseFloat(llegadaClienteCombustibleTiempoEntreLlegadas.toFixed(4)),

          rndLlegadaLavadero: parseFloat(llegadaClienteLavaderoRND.toFixed(4)),
          tiempoEntreLlegadasLavadero: parseFloat(llegadaClienteLavaderoTiempoEntreLlegadas.toFixed(4)),
          proximaLlegadaLavadero: parseFloat(reloj) + parseFloat(llegadaClienteLavaderoTiempoEntreLlegadas.toFixed(4)),
  
          rndLlegadaMantenimiento: parseFloat(llegadaClienteMantenimientoRND.toFixed(4)),
          tiempoEntreLlegadasMantenimiento: parseFloat(llegadaClienteMantenimientoTiempoEntreLlegadas.toFixed(4)),
          proximaLlegadaMantenimiento: parseFloat(reloj) + parseFloat(llegadaClienteMantenimientoTiempoEntreLlegadas.toFixed(4)),

          rndLlegadaCaja: parseFloat(llegadaClienteCajaRND.toFixed(4)),
          tiempoEntreLlegadasCaja: parseFloat(llegadaClienteCajaTiempoEntreLlegadas.toFixed(4)),
          proximaLlegadaCaja: parseFloat(reloj) + parseFloat(llegadaClienteCajaTiempoEntreLlegadas.toFixed(4)),
          
          rndVaKiosco: '',
          vaKiosco: '',
          finAtencionKiosco1: '',

          finAtencionCombustible1: '',
          finAtencionCombustible2: '',
          finAtencionCombustible3: '',
          finAtencionCombustible4: '',

          finAtencionLavadero1: '',
          finAtencionLavadero2: '',

          finAtencionMantenimiento1: '',
          finAtencionMantenimiento2: '',

          finAtencionCaja1: '',
          finAtencionCaja2: '',

          surtidor1: estadosSurtidores[0],
          surtidor2: estadosSurtidores[1],
          surtidor3: estadosSurtidores[2],
          surtidor4: estadosSurtidores[3],
          colaCombustible: Surtidor.colaComun.length,

          lavadero1: lavaderos[0].estado,
          lavadero2: lavaderos[1].estado,
          colaLavadero: Lavadero.colaComun.length,

          mantenimiento1: mantenimientos[0].estado,
          mantenimiento2: mantenimientos[1].estado,
          colaMantenimiento: MantenimientoRapido.colaComun.length,

          caja1: cajeros[0].estado,
          caja2: cajeros[1].estado,
          colaCaja: Cajero.colaComun.length,

          kiosco1: kioscos[0].estado,
          colaKiosco: Kiosco.colaComun.length,


          servicioMasRapido: '',
          
          acTiempoEsperaCombustible: 0,
          acTiempoEsperaLavadero: 0,
          acTiempoEsperaMantenimiento: 0,
          acTiempoEsperaCaja: 0,
          acTiempoEsperaKiosco: 0,

          acClientesIngresanCombustible: 0,
          acClientesIngresanLavadero: 0,
          acClientesIngresanMantenimiento: 0,
          acClientesIngresanCaja: 0,
          acClientesIngresanKiosco: 0,

          tiempoPromedioPermanenciaColaCombustible: 0,
          tiempoPromedioPermanenciaColaLavadero: 0,
          tiempoPromedioPermanenciaColaMantenimiento: 0,
          tiempoPromedioPermanenciaColaCaja: 0,
          tiempoPromedioPermanenciaColaKiosco: 0,

          acTiempoOcupacionCombustible: 0,
          porcentajeOcupacionCombustible: 0,
          acTiempoOcupacionLavadero: 0,
          porcentajeOcupacionLavadero: 0,
          acTiempoOcupacionMantenimiento: 0,
          porcentajeOcupacionMantenimiento: 0,
          acTiempoOcupacionCaja: 0,
          porcentajeOcupacionCaja: 0,
          acTiempoOcupacionKiosco: 0,
          porcentajeOcupacionKiosco: 0,

          acClientesAtendidosCombustible: 0,
          acClientesAtendidosLavadero: 0,
          acClientesAtendidosMantenimiento: 0,
          acClientesAtendidosCaja: 0,
          acClientesAtendidosKiosco: 0,

          servicioConMasCola: '',
        })
      } else{

        const proximoEvento = encontrarProxHoraImportante(horasImportantes);
        // console.log(proximoEvento)
        // console.log(horasImportantes)
        evento = proximoEvento.proxNombre
        reloj = proximoEvento.proxReloj.toFixed(4)

        if (evento == 'llegadaClienteCombustible'){

          llegadaClienteCombustibleRND = parseFloat(Math.random())
          llegadaClienteCombustibleTiempoEntreLlegadas = parseFloat((-1/valoresFormulario.tasaLlegadaCombustible * Math.log(1-llegadaClienteCombustibleRND)).toFixed(4))
          horasImportantes.llegadaClienteCombustible = parseFloat(reloj) + llegadaClienteCombustibleTiempoEntreLlegadas
          
          rndVaKiosco = Math.random()
          if(rndVaKiosco >= 0.25){

            const horaFinAtencion = parseFloat(reloj) + parseFloat(1/valoresFormulario.tasaAtencionSurtidor)
            const indiceServicioLibre = agregarClienteAServicio(surtidores, 'Surtidor', Surtidor, setSurtidores, horaFinAtencion, reloj, 'finAtencionCombustible', horasImportantes)
            if(indiceServicioLibre >= 0){
              horasImportantes[`finAtencionCombustible${indiceServicioLibre+1}`] = horaFinAtencion
            }

          } else{

            const horaFinAtencion = parseFloat(reloj) + parseFloat(1/valoresFormulario.tasaAtencionKiosco)
            const indiceServicioLibre = agregarClienteAServicio(kioscos, 'Kiosco', Kiosco, setKioscos, horaFinAtencion, reloj)
            if(indiceServicioLibre >= 0){
              horasImportantes[`finAtencionKiosco${indiceServicioLibre+1}`] = horaFinAtencion
            }

          }
          

        } else if(evento == 'llegadaClienteLavadero'){
          llegadaClienteLavaderoRND = parseFloat(Math.random())
          llegadaClienteLavaderoTiempoEntreLlegadas = parseFloat((-1/valoresFormulario.tasaLlegadaLavadero * Math.log(1-llegadaClienteLavaderoRND)).toFixed(4))
          horasImportantes.llegadaClienteLavadero = parseFloat(reloj) + llegadaClienteLavaderoTiempoEntreLlegadas
          
          rndVaKiosco = Math.random()
          if(rndVaKiosco >= 0.25){

            const horaFinAtencion = parseFloat(reloj) + parseFloat(1/valoresFormulario.tasaAtencionLavadero)
            const indiceServicioLibre = agregarClienteAServicio(lavaderos, 'Lavadero', Lavadero, setLavaderos, horaFinAtencion, reloj)
            if(indiceServicioLibre >= 0){
              horasImportantes[`finAtencionLavadero${indiceServicioLibre+1}`] = horaFinAtencion
            }
            
          } else{

            const horaFinAtencion = parseFloat(reloj) + parseFloat(1/valoresFormulario.tasaAtencionKiosco)
            const indiceServicioLibre = agregarClienteAServicio(kioscos, 'Kiosco', Kiosco, setKioscos, horaFinAtencion, reloj)
            if(indiceServicioLibre >= 0){
              horasImportantes[`finAtencionKiosco${indiceServicioLibre+1}`] = horaFinAtencion
            }

          }

        } else if(evento == 'llegadaClienteMantenimiento'){
          llegadaClienteMantenimientoRND = parseFloat(Math.random())
          llegadaClienteMantenimientoTiempoEntreLlegadas = parseFloat((-1/valoresFormulario.tasaLlegadaMantenimiento * Math.log(1-llegadaClienteMantenimientoRND)).toFixed(4))
          horasImportantes.llegadaClienteMantenimiento = parseFloat(reloj) + llegadaClienteMantenimientoTiempoEntreLlegadas
          
          rndVaKiosco = Math.random()
          if(rndVaKiosco >= 0.25){

            const horaFinAtencion = parseFloat(reloj) + parseFloat(1/valoresFormulario.tasaAtencionMantenimiento)
            const indiceServicioLibre = agregarClienteAServicio(mantenimientos, 'Mantenimiento', MantenimientoRapido, setMantenimientos, horaFinAtencion, reloj)
            if(indiceServicioLibre >= 0){
              horasImportantes[`finAtencionMantenimiento${indiceServicioLibre+1}`] = horaFinAtencion
            }
          
          } else{

            const horaFinAtencion = parseFloat(reloj) + parseFloat(1/valoresFormulario.tasaAtencionKiosco)
            const indiceServicioLibre = agregarClienteAServicio(kioscos, 'Kiosco', Kiosco, setKioscos, horaFinAtencion, reloj)
            if(indiceServicioLibre >= 0){
              horasImportantes[`finAtencionKiosco${indiceServicioLibre+1}`] = horaFinAtencion
            }

          }

        } else if(evento == 'llegadaClienteCaja'){
          llegadaClienteCajaRND = parseFloat(Math.random())
          llegadaClienteCajaTiempoEntreLlegadas = parseFloat((-1/valoresFormulario.tasaLlegadaCajero * Math.log(1-llegadaClienteCajaRND)).toFixed(4))
          horasImportantes.llegadaClienteCaja = parseFloat(reloj) + llegadaClienteCajaTiempoEntreLlegadas
          
          rndVaKiosco = Math.random()
          if(rndVaKiosco >= 0.25){

            const horaFinAtencion = parseFloat(reloj) + parseFloat(1/valoresFormulario.tasaAtencionCajero)
            const indiceServicioLibre = agregarClienteAServicio(cajeros, 'Cajero', Cajero, setCajeros, horaFinAtencion, reloj)
            if(indiceServicioLibre >= 0){
              horasImportantes[`finAtencionCaja${indiceServicioLibre+1}`] = horaFinAtencion
            }
            
          } else{

            const horaFinAtencion = parseFloat(reloj) + parseFloat(1/valoresFormulario.tasaAtencionKiosco)
            const indiceServicioLibre = agregarClienteAServicio(kioscos, 'Kiosco', Kiosco, setKioscos, horaFinAtencion, reloj)
            if(indiceServicioLibre >= 0){
              horasImportantes[`finAtencionKiosco${indiceServicioLibre+1}`] = horaFinAtencion
            }

          }
        } else if(evento.substring(0,evento.length-1) == 'finAtencionKiosco'){
          // console.log(reloj)
          const indiceFinalTexto = evento.substring(evento.length-1,evento.length)
          const horaFin = finAtencionServicio(Kiosco, 'Kiosco', indiceFinalTexto, reloj, kioscos, valoresFormulario.tasaAtencionKiosco)
          
          console.log(`RELOJ: ${reloj} - EVENTO: ${evento} - IndFinal: ${indiceFinalTexto} - HORAFIN: ${horaFin}}]`)

          horasImportantes[`finAtencionKiosco${indiceFinalTexto}`] = null
          if(horaFin){
            horasImportantes[`finAtencionKiosco${indiceFinalTexto}`] = horaFin
          }

        } else if(evento.substring(0,evento.length-1) == 'finAtencionCombustible'){
          // console.log(reloj)
          const indiceFinalTexto = evento.substring(evento.length-1,evento.length)
          const horaFin = finAtencionServicio(Surtidor, 'Surtidor', indiceFinalTexto, reloj, surtidores, valoresFormulario.tasaAtencionSurtidor)
          console.log(`RELOJ: ${reloj} - EVENTO: ${evento} - IndFinal: ${indiceFinalTexto} - HORAFIN: ${horaFin}}]`)

          if(horaFin){
            horasImportantes[`finAtencionCombustible${indiceFinalTexto}`] = horaFin
          }else{
            horasImportantes[`finAtencionCombustible${indiceFinalTexto}`] = null
          }
        } else if(evento.substring(0,evento.length-1) == 'finAtencionLavadero'){
          // console.log(reloj)
          const indiceFinalTexto = evento.substring(evento.length-1,evento.length)
          const horaFin = finAtencionServicio(Lavadero, 'Lavadero', indiceFinalTexto, reloj, lavaderos, valoresFormulario.tasaAtencionLavadero)
          console.log(`RELOJ: ${reloj} - EVENTO: ${evento} - IndFinal: ${indiceFinalTexto} - HORAFIN: ${horaFin}}]`)

          if(horaFin){
            horasImportantes[`finAtencionLavadero${indiceFinalTexto}`] = horaFin
          }else{
            horasImportantes[`finAtencionLavadero${indiceFinalTexto}`] = null
          }
        } else if(evento.substring(0,evento.length-1) == 'finAtencionMantenimiento'){
          // console.log(reloj)
          const indiceFinalTexto = evento.substring(evento.length-1,evento.length)
          const horaFin = finAtencionServicio(MantenimientoRapido, 'Mantenimiento', indiceFinalTexto, reloj, mantenimientos, valoresFormulario.tasaAtencionMantenimiento)
          console.log(`RELOJ: ${reloj} - EVENTO: ${evento} - IndFinal: ${indiceFinalTexto} - HORAFIN: ${horaFin}}]`)

          if(horaFin){
            horasImportantes[`finAtencionMantenimiento${indiceFinalTexto}`] = horaFin
          }else{
            horasImportantes[`finAtencionMantenimiento${indiceFinalTexto}`] = null
          }
        } else if(evento.substring(0,evento.length-1) == 'finAtencionCaja'){
          // console.log(reloj)
          const indiceFinalTexto = evento.substring(evento.length-1,evento.length)
          const horaFin = finAtencionServicio(Cajero, 'Caja', indiceFinalTexto, reloj, cajeros, valoresFormulario.tasaAtencionCajero)
          console.log(`RELOJ: ${reloj} - EVENTO: ${evento} - IndFinal: ${indiceFinalTexto} - HORAFIN: ${horaFin}}]`)

          if(horaFin){
            horasImportantes[`finAtencionCaja${indiceFinalTexto}`] = horaFin
          }else{
            horasImportantes[`finAtencionCaja${indiceFinalTexto}`] = null
          }
        }

        // const a = 'finAtencionKiosco1'
        // console.log(a.substring(0,a.length-1)) 
        // console.log(a.substring(a.length-1,a.length))
        console.log(reloj)

        const estadosSurtidores = surtidores.map((surtidor) => surtidor.estado);
        const horaFinSurtidores = [horasImportantes.finAtencionCombustible1,
          horasImportantes.finAtencionCombustible2,
          horasImportantes.finAtencionCombustible3,
          horasImportantes.finAtencionCombustible4,
        ]
        // const horaFinSurtidores = Surtidor.colaComun
        //                           .filter(cliente => cliente.servidorEnElQueEsta !== null && cliente.horaFinAtencion !== null)
        //                           .map(cliente => cliente.horaFinAtencion);
        // console.log('surtidor')
        // console.log(Surtidor.colaComun.map(c => c))
        // console.log(horaFinSurtidores)

        const estadosLavaderos = lavaderos.map((lavadero) => lavadero.estado);
        const horaFinLavaderos = [horasImportantes.finAtencionLavadero1,
          horasImportantes.finAtencionLavadero2
        ]
        // const horaFinLavaderos = Lavadero.colaComun
        //                           .filter(cliente => cliente.servidorEnElQueEsta !== null && cliente.horaFinAtencion !== null)
        //                           .map(cliente => cliente.horaFinAtencion);
        // console.log('lavaderp')
        // console.log(Lavadero.colaComun.map(c => c))
        // console.log(horaFinLavaderos)

        const estadosMantenimiento = mantenimientos.map((mantenimiento) => mantenimiento.estado);
        const horaFinMantenimiento = [horasImportantes.finAtencionMantenimiento1,
          horasImportantes.finAtencionMantenimiento2
        ]
        // const horaFinMantenimiento = MantenimientoRapido.colaComun
        //                           .filter(cliente => cliente.servidorEnElQueEsta !== null && cliente.horaFinAtencion !== null)
        //                           .map(cliente => cliente.horaFinAtencion);
        // console.log('mantenimi')
        // console.log(MantenimientoRapido.colaComun.map(c => c))
        // console.log(horaFinMantenimiento)

        const estadosCaja = cajeros.map((caja) => caja.estado);
        const horaFinCaja = [horasImportantes.finAtencionCaja1,
          horasImportantes.finAtencionCaja2
        ]
        // const horaFinCaja = Cajero.colaComun
        //                           .filter(cliente => cliente.servidorEnElQueEsta !== null && cliente.horaFinAtencion !== null)
        //                           .map(cliente => cliente.horaFinAtencion);
        // console.log('caja')
        // console.log(Cajero.colaComun.map(c => c))
        // console.log(horaFinCaja)

        const estadosKiosco = kioscos.map((kisoco) => kisoco.estado);
        const horaFinKiosco = [horasImportantes.finAtencionKiosco1]
        // const horaFinKiosco = Kiosco.colaComun
        //                           .filter(cliente => cliente.servidorEnElQueEsta !== null && cliente.horaFinAtencion !== null)
        //                           .map(cliente => cliente.horaFinAtencion);

        // console.log('kisoco')
        // console.log(Kiosco.colaComun.map(c => c))
        // console.log(horaFinKiosco)
        
        tabla.push({
          evento: evento,
          reloj: reloj,
  
          rndLlegadaCombustible: evento=='llegadaClienteCombustible' ? parseFloat(llegadaClienteCombustibleRND.toFixed(4)) : '',
          tiempoEntreLlegadasCombustible: evento=='llegadaClienteCombustible' ? parseFloat(llegadaClienteCombustibleTiempoEntreLlegadas.toFixed(4)) : '',
          proximaLlegadaCombustible: parseFloat(horasImportantes.llegadaClienteCombustible.toFixed(4)),

          rndLlegadaLavadero: evento=='llegadaClienteLavadero' ? parseFloat(llegadaClienteLavaderoRND.toFixed(4)): '',
          tiempoEntreLlegadasLavadero: evento=='llegadaClienteLavadero' ? parseFloat(llegadaClienteLavaderoTiempoEntreLlegadas.toFixed(4)) : '',
          proximaLlegadaLavadero: parseFloat(horasImportantes.llegadaClienteLavadero.toFixed(4)),

          rndLlegadaMantenimiento: evento=='llegadaClienteMantenimiento' ? parseFloat(llegadaClienteMantenimientoRND.toFixed(4)): '',
          tiempoEntreLlegadasMantenimiento: evento=='llegadaClienteMantenimiento' ? parseFloat(llegadaClienteMantenimientoTiempoEntreLlegadas.toFixed(4)) : '',
          proximaLlegadaMantenimiento: parseFloat(horasImportantes.llegadaClienteMantenimiento.toFixed(4)),

          rndLlegadaCaja: evento=='llegadaClienteCaja' ? parseFloat(llegadaClienteCajaRND.toFixed(4)): '',
          tiempoEntreLlegadasCaja: evento=='llegadaClienteCaja' ? parseFloat(llegadaClienteCajaTiempoEntreLlegadas.toFixed(4)) : '',
          proximaLlegadaCaja: parseFloat(horasImportantes.llegadaClienteCaja.toFixed(4)),
  
          rndVaKiosco: evento.substring(0,7)=='llegada' 
                        ? rndVaKiosco ? parseFloat(rndVaKiosco).toFixed(4) : ''
                        : '',
          vaKiosco: evento.substring(0,7)=='llegada'  
                        ? rndVaKiosco >= 0.25 ? 'No' : 'Sí'
                        : '',
          finAtencionKiosco1: horaFinKiosco[0] ? parseFloat(horaFinKiosco[0]).toFixed(4) : '',

          finAtencionCombustible1: horaFinSurtidores[0] ? parseFloat(horaFinSurtidores[0]).toFixed(4) : '',
          finAtencionCombustible2: horaFinSurtidores[1] ? parseFloat(horaFinSurtidores[1]).toFixed(4) : '',
          finAtencionCombustible3: horaFinSurtidores[2] ? parseFloat(horaFinSurtidores[2]).toFixed(4) : '',
          finAtencionCombustible4: horaFinSurtidores[3] ? parseFloat(horaFinSurtidores[3]).toFixed(4) : '',

          finAtencionLavadero1: horaFinLavaderos[0] ? parseFloat(horaFinLavaderos[0]).toFixed(4) : '',
          finAtencionLavadero2: horaFinLavaderos[1] ? parseFloat(horaFinLavaderos[1]).toFixed(4) : '',

          finAtencionMantenimiento1: horaFinMantenimiento[0] ? parseFloat(horaFinMantenimiento[0]).toFixed(4) : '',
          finAtencionMantenimiento2: horaFinMantenimiento[1] ? parseFloat(horaFinMantenimiento[1]).toFixed(4) : '',

          finAtencionCaja1: horaFinCaja[0] ? parseFloat(horaFinCaja[0]).toFixed(4) : '',
          finAtencionCaja2: horaFinCaja[1] ? parseFloat(horaFinCaja[1]).toFixed(4) : '',

          surtidor1: estadosSurtidores[0],
          surtidor2: estadosSurtidores[1],
          surtidor3: estadosSurtidores[2],
          surtidor4: estadosSurtidores[3],
          colaCombustible: Surtidor.colaComun.length < 4 ? 0 : Surtidor.colaComun.length - 4,

          lavadero1: estadosLavaderos[0],
          lavadero2: estadosLavaderos[1],
          colaLavadero: Lavadero.colaComun.length < 2 ? 0 : Lavadero.colaComun.length - 2,

          mantenimiento1: estadosMantenimiento[0],
          mantenimiento2: estadosMantenimiento[1],
          colaMantenimiento: MantenimientoRapido.colaComun.length < 2 ? 0 : MantenimientoRapido.colaComun.length - 2,

          caja1: estadosCaja[0],
          caja2: estadosCaja[1],
          colaCaja: Cajero.colaComun.length < 2 ? 0 : Cajero.colaComun.length - 2,

          kiosco1: estadosKiosco[0],
          colaKiosco: Kiosco.colaComun.length < 1 ? 0 : Kiosco.colaComun.length - 1,

          // servicioMasRapido: '',
          
          // acTiempoEsperaCombustible: 0,
          // acTiempoEsperaLavadero: 0,
          // acTiempoEsperaMantenimiento: 0,
          // acTiempoEsperaCaja: 0,
          // acTiempoEsperaKiosco: 0,

          // acClientesIngresanCombustible: 0,
          // acClientesIngresanLavadero: 0,
          // acClientesIngresanMantenimiento: 0,
          // acClientesIngresanCaja: 0,
          // acClientesIngresanKiosco: 0,

          // tiempoPromedioPermanenciaColaCombustible: 0,
          // tiempoPromedioPermanenciaColaLavadero: 0,
          // tiempoPromedioPermanenciaColaMantenimiento: 0,
          // tiempoPromedioPermanenciaColaCaja: 0,
          // tiempoPromedioPermanenciaColaKiosco: 0,

          // acTiempoOcupacionCombustible: 0,
          // porcentajeOcupacionCombustible: 0,
          // acTiempoOcupacionLavadero: 0,
          // porcentajeOcupacionLavadero: 0,
          // acTiempoOcupacionMantenimiento: 0,
          // porcentajeOcupacionMantenimiento: 0,
          // acTiempoOcupacionCaja: 0,
          // porcentajeOcupacionCaja: 0,
          // acTiempoOcupacionKiosco: 0,
          // porcentajeOcupacionKiosco: 0,

          // acClientesAtendidosCombustible: 0,
          // acClientesAtendidosLavadero: 0,
          // acClientesAtendidosMantenimiento: 0,
          // acClientesAtendidosCaja: 0,
          // acClientesAtendidosKiosco: 0,

          // servicioConMasCola: '',
        })
      }

    }

    setTablaDeSimulacion(tabla)
  }


  const encontrarMenorValor = (fila) => {
    const valores = [
      parseFloat(fila.proximaLlegadaCombustible),
      parseFloat(fila.proximaLlegadaLavadero),
      parseFloat(fila.proximaLlegadaMantenimiento),
      parseFloat(fila.proximaLlegadaCaja),
      parseFloat(fila.finAtencionKiosco1),
      parseFloat(fila.finAtencionCombustible1),
      parseFloat(fila.finAtencionCombustible2),
      parseFloat(fila.finAtencionCombustible3),
      parseFloat(fila.finAtencionCombustible4),
      parseFloat(fila.finAtencionLavadero1),
      parseFloat(fila.finAtencionLavadero2),
      parseFloat(fila.finAtencionMantenimiento1),
      parseFloat(fila.finAtencionMantenimiento2),
      parseFloat(fila.finAtencionCaja1),
      parseFloat(fila.finAtencionCaja2)
    ];
    
    const valoresFiltrados = valores.filter(valor => !isNaN(valor));
    // console.log(valoresFiltrados)

    const menorValor = Math.min(...valoresFiltrados);
    // console.log(menorValor)
    return menorValor;
  };

  return (
    <>
    {/* PARAMETRIZABLES  {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}}*/}
      <form onSubmit={handleSubmit}>
        <label>
          Cantidad de líneas a simular:
          <input type="number" name="lineasASimular" value={valoresFormulario.lineasASimular} onChange={handleChange} />
        </label>
        <br />
        <label>
          A partir de qué línea visualizar:
          <input type="number" name="lineaAVisualizar" value={valoresFormulario.lineaAVisualizar} onChange={handleChange} />
        </label>
        <br />
        <label>
          Tasa de vehículos a atender por hora por surtidor:
          <input type="number" name="tasaAtencionSurtidor" value={valoresFormulario.tasaAtencionSurtidor} onChange={handleChange} />
        </label>
        <br />
        <label>
          Tasa de vehículos a atender por hora por lavadero:
          <input type="number" name="tasaAtencionLavadero" value={valoresFormulario.tasaAtencionLavadero} onChange={handleChange} />
        </label>
        <br />
        <label>
          Tasa de vehículos a atender por hora por mantenimiento:
          <input type="number" name="tasaAtencionMantenimiento" value={valoresFormulario.tasaAtencionMantenimiento} onChange={handleChange} />
        </label>
        <br />
        <label>
          Tasa de personas a atender por hora por cajero:
          <input type="number" name="tasaAtencionCajero" value={valoresFormulario.tasaAtencionCajero} onChange={handleChange} />
        </label>
        <br />
        <label>
          Tasa de personas a atender por hora por nuevo servicio:
          <input type="number" name="tasaAtencionKiosco" value={valoresFormulario.tasaAtencionKiosco} onChange={handleChange} />
        </label>
        <br />
        <label>
          Cantidad de vehículos que llegan a cargar combustible por hora:
          <input type="number" name="tasaLlegadaCombustible" value={valoresFormulario.tasaLlegadaCombustible} onChange={handleChange} />
        </label>
        <br />
        <label>
          Cantidad de vehículos que llegan a lavar el vehículo por hora:
          <input type="number" name="tasaLlegadaLavadero" value={valoresFormulario.tasaLlegadaLavadero} onChange={handleChange} />
        </label>
        <br />
        <label>
          Cantidad de vehículos que llegan a mantenimiento por hora:
          <input type="number" name="tasaLlegadaMantenimiento" value={valoresFormulario.tasaLlegadaMantenimiento} onChange={handleChange} />
        </label>
        <br />
        <label>
          Cantidad de personas que llegan a caja por hora:
          <input type="number" name="tasaLlegadaCajero" value={valoresFormulario.tasaLlegadaCajero} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Simular</button>
      </form>


      {/* TABLA {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}} */}
      {mostrarTablas &&
        <div>
          <h1>Simulación</h1>
          <table>
            <thead>
              <tr className='se'>
                <th colSpan="27"></th>
                <th colSpan="5">SURTIDOR</th>
                <th colSpan="3">LAVADERO</th>
                <th colSpan="3">MANTENIMIENTO</th>
                <th colSpan="3">CAJERO</th>
                <th colSpan="2">KIOSCO</th>
                
                <th></th>

                <th colSpan="5"></th>
                <th colSpan="5"></th>
                <th colSpan="5"></th>
                <th colSpan="10"></th>
                <th colSpan="5"></th>
                <th colSpan="1"></th>
              </tr>
              <tr>
                <th colSpan="2"></th>

                <th colSpan="3" className='ll-c-c'>llegada_cliente_combustible</th>
                <th colSpan="3" className='ll-c-l'>llegada_cliente_lavadero</th>
                <th colSpan="3" className='ll-c-m'>llegada_cliente_mantenimiento</th>
                <th colSpan="3" className='ll-c-ca'>llegada_cliente_caja</th>
                <th colSpan="3" className='ll-c-k'>llegada_cliente_kiosco</th>

                <th colSpan="4" className='f-a-c'>fin_atención_combustible</th>
                <th colSpan="2" className='f-a-l'>fin_atención_lavado</th>
                <th colSpan="2" className='f-a-m'>fin_atención_mantenimiento</th>
                <th colSpan="2" className='f-a-ca'>fin_atención_caja</th>

                <th>Estado</th>
                <th>Estado</th>
                <th>Estado</th>
                <th>Estado</th>

                <th></th>

                <th>Estado</th>
                <th>Estado</th>

                <th></th>

                <th>Estado</th>
                <th>Estado</th>

                <th></th>

                <th>Estado</th>
                <th>Estado</th>

                <th></th>

                <th>Estado</th>
                <th></th>

                <th>Punto 2</th>

                <th colSpan="5">AC tiempo espera</th>
                <th colSpan="5">AC clientes que ingresan</th>
                <th colSpan="5">Tiempo promedio de permanencia en cola</th>
                <th colSpan="10">AC tiempo ocupación</th>
                <th colSpan="5">Cantidad de clientes atendidos</th>
                <th colSpan="1"></th>
              </tr>
              <tr>
                <th>Evento</th>
                <th>Reloj (hs)</th>

                <th className='rnd'>RND</th>
                <th className='tiempo-entre'>Tiempo entre llegadas</th>
                <th className='prox-llegada'>Próxima llegada</th>

                <th className='rnd'>RND</th>
                <th className='tiempo-entre'>Tiempo entre llegadas</th>
                <th className='prox-llegada'>Próxima llegada</th>

                <th className='rnd'>RND</th>
                <th className='tiempo-entre'>Tiempo entre llegadas</th>
                <th className='prox-llegada'>Próxima llegada</th>

                <th className='rnd'>RND</th>
                <th className='tiempo-entre'>Tiempo entre llegadas</th>
                <th className='prox-llegada'>Próxima llegada</th>

                <th className='rnd'>RND</th>
                <th className='tiempo-entre'>Va al Kiosco</th>
                <th className='prox-llegada'>Tiempo fin de uso</th>

                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>

                <th>1</th>
                <th>2</th>

                <th>1</th>
                <th>2</th>

                <th>1</th>
                <th>2</th>

                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>Cola</th>

                <th>1</th>
                <th>2</th>
                <th>Cola</th>

                <th>1</th>
                <th>2</th>
                <th>Cola</th>

                <th>1</th>
                <th>2</th>
                <th>Cola</th>

                <th></th>
                <th>Cola</th>

                <th>Servicio más rapido</th>

                <th>Combustible</th>
                <th>Lavadero</th>
                <th>Mantenimiento</th>
                <th>Caja</th>
                <th>Kiosco</th>

                <th>Combustible</th>
                <th>Lavadero</th>
                <th>Mantenimiento</th>
                <th>Caja</th>
                <th>Kiosco</th>

                <th>Combustible</th>
                <th>Lavadero</th>
                <th>Mantenimiento</th>
                <th>Caja</th>
                <th>Kiosco</th>

                <th>Combustible</th>
                <th>% ocupación</th>
                <th>Lavadero</th>
                <th>% ocupación</th>
                <th>Mantenimiento</th>
                <th>% ocupación</th>
                <th>Caja</th>
                <th>% ocupación</th>
                <th>Kiosco</th>
                <th>% ocupación</th>

                <th>Combustible</th>
                <th>Lavadero</th>
                <th>Mantenimiento</th>
                <th>Caja</th>
                <th>Kiosco</th>

                <th>Servicio mas lento (con mas cola)</th>
              </tr>
            </thead>
            <tbody>
              {tablaDeSimulacion.map((fila, index) => {
                
                const menorValor = encontrarMenorValor(fila);
                // console.log(menorValor)
               
                return(
                  <tr key={index}>
                    <td>{fila.evento}</td>
                    <td>{fila.reloj}</td>

                    <td>{fila.rndLlegadaCombustible}</td>
                    <td>{fila.tiempoEntreLlegadasCombustible}</td>
                    <td className={fila.proximaLlegadaCombustible === menorValor ? 'menorValor' : ''}>{fila.proximaLlegadaCombustible}</td>

                    <td>{fila.rndLlegadaLavadero}</td>
                    <td>{fila.tiempoEntreLlegadasLavadero}</td>
                    <td className={fila.proximaLlegadaLavadero === menorValor ? 'menorValor' : ''}>{fila.proximaLlegadaLavadero}</td>

                    <td>{fila.rndLlegadaMantenimiento}</td>
                    <td>{fila.tiempoEntreLlegadasMantenimiento}</td>
                    <td className={fila.proximaLlegadaMantenimiento === menorValor ? 'menorValor' : ''}>{fila.proximaLlegadaMantenimiento}</td>

                    <td>{fila.rndLlegadaCaja}</td>
                    <td>{fila.tiempoEntreLlegadasCaja}</td>
                    <td className={fila.proximaLlegadaCaja === menorValor ? 'menorValor' : ''}>{fila.proximaLlegadaCaja}</td>

                    <td>{fila.rndVaKiosco}</td>
                    <td>{fila.vaKiosco}</td>
                    <td className={fila.finAtencionKiosco1 === menorValor ? 'menorValor' : ''}>{fila.finAtencionKiosco1}</td>

                    <td className={fila.finAtencionCombustible1 === menorValor ? 'menorValor' : ''}>{fila.finAtencionCombustible1}</td>
                    <td className={fila.finAtencionCombustible2 === menorValor ? 'menorValor' : ''}>{fila.finAtencionCombustible2}</td>
                    <td className={fila.finAtencionCombustible3 === menorValor ? 'menorValor' : ''}>{fila.finAtencionCombustible3}</td>
                    <td className={fila.finAtencionCombustible4 === menorValor ? 'menorValor' : ''}>{fila.finAtencionCombustible4}</td>

                    <td className={fila.finAtencionLavadero1 === menorValor ? 'menorValor' : ''}>{fila.finAtencionLavadero1}</td>
                    <td className={fila.finAtencionLavadero2 === menorValor ? 'menorValor' : ''}>{fila.finAtencionLavadero2}</td>

                    <td className={fila.finAtencionMantenimiento1 === menorValor ? 'menorValor' : ''}>{fila.finAtencionMantenimiento1}</td>
                    <td className={fila.finAtencionMantenimiento2 === menorValor ? 'menorValor' : ''}>{fila.finAtencionMantenimiento2}</td>

                    <td className={fila.finAtencionCaja1 === menorValor ? 'menorValor' : ''}>{fila.finAtencionCaja1}</td>
                    <td className={fila.finAtencionCaja2 === menorValor ? 'menorValor' : ''}>{fila.finAtencionCaja2}</td>

                    <td>{fila.surtidor1}</td>
                    <td>{fila.surtidor2}</td>
                    <td>{fila.surtidor3}</td>
                    <td>{fila.surtidor4}</td>
                    <td>{fila.colaCombustible}</td>

                    <td>{fila.lavadero1}</td>
                    <td>{fila.lavadero2}</td>
                    <td>{fila.colaLavadero}</td>

                    <td>{fila.mantenimiento1}</td>
                    <td>{fila.mantenimiento2}</td>
                    <td>{fila.colaMantenimiento}</td>

                    <td>{fila.caja1}</td>
                    <td>{fila.caja2}</td>
                    <td>{fila.colaCaja}</td>

                    <td>{fila.kiosco1}</td>
                    <td>{fila.colaKiosco}</td>


                    <td>{fila.servicioMasRapido}</td>

                    <td>{fila.acTiempoEsperaCombustible}</td>
                    <td>{fila.acTiempoEsperaLavadero}</td>
                    <td>{fila.acTiempoEsperaMantenimiento}</td>
                    <td>{fila.acTiempoEsperaCaja}</td>
                    <td>{fila.acTiempoEsperaKiosco}</td>

                    <td>{fila.acClientesIngresanCombustible}</td>
                    <td>{fila.acClientesIngresanLavadero}</td>
                    <td>{fila.acClientesIngresanMantenimiento}</td>
                    <td>{fila.acClientesIngresanCaja}</td>
                    <td>{fila.acClientesIngresanKiosco}</td>

                    <td>{fila.tiempoPromedioPermanenciaColaCombustible}</td>
                    <td>{fila.tiempoPromedioPermanenciaColaLavadero}</td>
                    <td>{fila.tiempoPromedioPermanenciaColaMantenimiento}</td>
                    <td>{fila.tiempoPromedioPermanenciaColaCaja}</td>
                    <td>{fila.tiempoPromedioPermanenciaColaKiosco}</td>

                    <td>{fila.acTiempoOcupacionCombustible}</td>
                    <td>{fila.porcentajeOcupacionCombustible}</td>
                    <td>{fila.acTiempoOcupacionLavadero}</td>
                    <td>{fila.porcentajeOcupacionLavadero}</td>
                    <td>{fila.acTiempoOcupacionMantenimiento}</td>
                    <td>{fila.porcentajeOcupacionMantenimiento}</td>
                    <td>{fila.acTiempoOcupacionCaja}</td>
                    <td>{fila.porcentajeOcupacionCaja}</td>
                    <td>{fila.acTiempoOcupacionKiosco}</td>
                    <td>{fila.porcentajeOcupacionKiosco}</td>

                    <td>{fila.acClientesAtendidosCombustible}</td>
                    <td>{fila.acClientesAtendidosLavadero}</td>
                    <td>{fila.acClientesAtendidosMantenimiento}</td>
                    <td>{fila.acClientesAtendidosCaja}</td>
                    <td>{fila.acClientesAtendidosKiosco}</td>

                    <td>{fila.servicioConMasCola}</td>

                    

                    {/* <td>{reloj.toFixed(2)}</td>
                    <td>{llegadaClienteCombustible.RND.toFixed(2)}</td>
                    <td>{llegadaClienteCombustible.tiempoEntreLLegadas.toFixed(2)}</td>
                    <td>{llegadaClienteCombustible.proximaLlegada.toFixed(2)}</td>
                    <td colSpan="4"></td>
                    {surtidores.map((surtidor, index) => (
                      <td key={index}>{surtidor.estado}</td>
                    ))}
                    <td>{Surtidor.colaComun.length}</td> */}
                  </tr> 
                )
              })}
            </tbody>
          </table>
        </div>
      }
      
      
      {/* EJEMPLO SURITDOR {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}} */}
        {/* <div>
          <h1>Surtidores</h1>
          {surtidores.map((surtidor, index) => (
            <div key={index}>
              <p>Surtidor {index + 1}</p>
              <p>Estado: {surtidor.estado}</p>
              <button onClick={() => cambiarEstadoSurtidor(index)}>
                Cambiar a {surtidor.estado === 'Libre' ? 'Ocupado' : 'Libre'}
              </button>
            </div>
          ))}
          <h2>Cola Común</h2>
          <ul>
            {Surtidor.colaComun.map((vehiculo, index) => (
              <li key={index}>{vehiculo}</li>
            ))}
          </ul>
          <button onClick={() => agregarClienteAColaSurtidor('Vehículo ' + (Surtidor.colaComun.length + 1))}>
            Agregar Vehículo a la Cola
          </button>
        </div> */}

      {/* EJEMPLO CLIENTE {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}} */}
        {/* <div>
          <h1>Clientes</h1>
          {clientes.map((cliente, index) => (
            <div key={index}>
              <p>Cliente {index + 1}</p>
              <p>Estado: {cliente.estado}</p>
              <select
                value={cliente.estado}
                onChange={(e) => cambiarEstadoCliente(index, e.target.value)}
              >
                {estados.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button onClick={agregarCliente}>Agregar Cliente</button>
        </div> */}

    </>
  )
}

export default App
