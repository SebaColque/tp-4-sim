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

  cambiarFinAtencionCombustible(nuevoFinAtenciónCombustible) {
    this.finAtenciónCombustible = nuevoFinAtenciónCombustible;
  }
}

class Lavadero {
  static colaComun = [];

  constructor() {
    this.estado = 'Libre';
  }
}

class MantenimientoRapido {
  static colaComun = [];

  constructor() {
    this.estado = 'Libre';
  }
}

class Cajero {
  static colaComun = [];

  constructor() {
    this.estado = 'Libre';
  }
}

class Kiosco {
  static colaComun = [];

  constructor() {
    this.estado = 'Libre';
  }
}

// CLIENTE - OBJETO TEMPORAL {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}}
class Cliente {
  constructor() {
    this.estado = ''; // Estado inicial: Esperando atención surtidor
  }

  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
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
    lineasASimular: 100,
    lineaAVisualizar: 1,
    tasaSurtidor: 20,
    tasaLavadero: 10,
    tasaMantenimiento: 5,
    tasaCajero: 15,
    tasaNuevoServicio: 30,
    tasaLlegadaCombustible: 30,
    tasaLlegadaLavadero: 15,
    tasaLlegadaMantenimiento: 10,
    tasaLlegadaCajero: 40
  });

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
  const generarTabla = () => {
    const tabla = [];
    
    for(var i = 0; i < valoresFormulario.lineasASimular; i++){
      let llegadaClienteCombustibleRND
      let llegadaClienteCombustibleTiempoEntreLlegadas

      let llegadaClienteLavaderoRND
      let llegadaClienteLavaderoTiempoEntreLlegadas

      let llegadaClienteMantenimientoRND
      let llegadaClienteMantenimientoTiempoEntreLlegadas

      let llegadaClienteCajaRND
      let llegadaClienteCajaTiempoEntreLlegadas

      if(i == 0){
        setEvento('Inicialización')
        setReloj(0)
  
        // COMBUSTIBLE
        // llegada_cliente_combustible
        llegadaClienteCombustibleRND = parseFloat(Math.random())
        llegadaClienteCombustibleTiempoEntreLlegadas = -1/valoresFormulario.tasaLlegadaCombustible * Math.log(1-llegadaClienteCombustibleRND)
        setllegadaClienteCombustible({
          RND: llegadaClienteCombustibleRND,
          tiempoEntreLLegadas: llegadaClienteCombustibleTiempoEntreLlegadas,
          proximaLlegada: reloj + llegadaClienteCombustibleTiempoEntreLlegadas
        })

        // LAVADERO
        // llegada_cliente_lavado
        llegadaClienteLavaderoRND = parseFloat(Math.random())
        llegadaClienteLavaderoTiempoEntreLlegadas = -1/valoresFormulario.tasaLlegadaLavadero * Math.log(1-llegadaClienteLavaderoRND)
        setllegadaClienteLavadero({
          RND: llegadaClienteLavaderoRND,
          tiempoEntreLLegadas: llegadaClienteLavaderoTiempoEntreLlegadas,
          proximaLlegada: reloj + llegadaClienteLavaderoTiempoEntreLlegadas
        })

        // MANTENIMIENTO
        // llegada_cliente_mantenimiento
        llegadaClienteMantenimientoRND = parseFloat(Math.random())
        llegadaClienteMantenimientoTiempoEntreLlegadas = -1/valoresFormulario.tasaLlegadaMantenimiento * Math.log(1-llegadaClienteMantenimientoRND)
        setllegadaClienteMantenimiento({
          RND: llegadaClienteMantenimientoRND,
          tiempoEntreLLegadas: llegadaClienteMantenimientoTiempoEntreLlegadas,
          proximaLlegada: reloj + llegadaClienteMantenimientoTiempoEntreLlegadas
        })

        // CAJA
        // llegada_cliente_caja
        llegadaClienteCajaRND = parseFloat(Math.random())
        llegadaClienteCajaTiempoEntreLlegadas = -1/valoresFormulario.tasaLlegadaCajero * Math.log(1-llegadaClienteCajaRND)
        setllegadaClienteCaja({
          RND: llegadaClienteCajaRND,
          tiempoEntreLLegadas: llegadaClienteCajaTiempoEntreLlegadas,
          proximaLlegada: reloj + llegadaClienteCajaTiempoEntreLlegadas
        })

        
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
          finAtencionKiosco: '',

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

          surtidor1: surtidores[0].estado,
          surtidor2: surtidores[1].estado,
          surtidor3: surtidores[2].estado,
          surtidor4: surtidores[3].estado,
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
      }

    }

    setTablaDeSimulacion(tabla)
  }


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
          <input type="number" name="tasaSurtidor" value={valoresFormulario.tasaSurtidor} onChange={handleChange} />
        </label>
        <br />
        <label>
          Tasa de vehículos a atender por hora por lavadero:
          <input type="number" name="tasaLavadero" value={valoresFormulario.tasaLavadero} onChange={handleChange} />
        </label>
        <br />
        <label>
          Tasa de vehículos a atender por hora por mantenimiento:
          <input type="number" name="tasaMantenimiento" value={valoresFormulario.tasaMantenimiento} onChange={handleChange} />
        </label>
        <br />
        <label>
          Tasa de personas a atender por hora por cajero:
          <input type="number" name="tasaCajero" value={valoresFormulario.tasaCajero} onChange={handleChange} />
        </label>
        <br />
        <label>
          Tasa de personas a atender por hora por nuevo servicio:
          <input type="number" name="tasaNuevoServicio" value={valoresFormulario.tasaNuevoServicio} onChange={handleChange} />
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
          <table border="1">
            <thead>
              <tr>
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

                <th colSpan="3">llegada_cliente_combustible</th>
                <th colSpan="3">llegada_cliente_lavadero</th>
                <th colSpan="3">llegada_cliente_mantenimiento</th>
                <th colSpan="3">llegada_cliente_caja</th>
                <th colSpan="3">llegada_cliente_kiosco</th>

                <th colSpan="4">fin_atención_combustible</th>
                <th colSpan="2">fin_atención_lavado</th>
                <th colSpan="2">fin_atención_mantenimiento</th>
                <th colSpan="2">fin_atención_caja</th>

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

                <th>RND</th>
                <th>Tiempo entre llegadas</th>
                <th>Próxima llegada</th>

                <th>RND</th>
                <th>Tiempo entre llegadas</th>
                <th>Próxima llegada</th>

                <th>RND</th>
                <th>Tiempo entre llegadas</th>
                <th>Próxima llegada</th>

                <th>RND</th>
                <th>Tiempo entre llegadas</th>
                <th>Próxima llegada</th>

                <th>RND</th>
                <th>Vá al Kisoco</th>
                <th>Tiempo fin de uso</th>

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
              {tablaDeSimulacion.map((fila, index) => (
                <tr key={index}>
                  <td>{fila.evento}</td>
                  <td>{fila.reloj}</td>

                  <td>{fila.rndLlegadaCombustible}</td>
                  <td>{fila.tiempoEntreLlegadasCombustible}</td>
                  <td>{fila.proximaLlegadaCombustible}</td>

                  <td>{fila.rndLlegadaLavadero}</td>
                  <td>{fila.tiempoEntreLlegadasLavadero}</td>
                  <td>{fila.proximaLlegadaLavadero}</td>

                  <td>{fila.rndLlegadaMantenimiento}</td>
                  <td>{fila.tiempoEntreLlegadasMantenimiento}</td>
                  <td>{fila.proximaLlegadaMantenimiento}</td>

                  <td>{fila.rndLlegadaCaja}</td>
                  <td>{fila.tiempoEntreLlegadasCaja}</td>
                  <td>{fila.proximaLlegadaCaja}</td>

                  <td>{fila.rndVaKiosco}</td>
                  <td>{fila.vaKiosco}</td>
                  <td>{fila.finAtencionKiosco}</td>

                  <td>{fila.finAtencionCombustible1}</td>
                  <td>{fila.finAtencionCombustible2}</td>
                  <td>{fila.finAtencionCombustible3}</td>
                  <td>{fila.finAtencionCombustible4}</td>

                  <td>{fila.finAtencionLavadero1}</td>
                  <td>{fila.finAtencionLavadero2}</td>

                  <td>{fila.finAtencionMantenimiento1}</td>
                  <td>{fila.finAtencionMantenimiento2}</td>

                  <td>{fila.finAtencionCaja1}</td>
                  <td>{fila.finAtencionCaja2}</td>

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
              ))}
            </tbody>
          </table>
        </div>
      }
      
      
      {/* EJEMPLO SURITDOR {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}} */}
        <div>
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
        </div>

      {/* EJEMPLO CLIENTE {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}} */}
        <div>
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
        </div>

    </>
  )
}

export default App
