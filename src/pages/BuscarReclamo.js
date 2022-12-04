import React,{Component,useState, useEffect, useCallback} from 'react'
import flecha from '../imagenes/flecha.png'
import logo from '../imagenes/logo.png'
import { Link } from 'react-router-dom'
import reclamosi from '../imagenes/reclamos.png'
import Select from 'react-select'
import {Carousel} from 'react-responsive-carousel'

export default function BuscarReclamo(){

    const [seSelecciono,setSeSelecciono]=useState(false);
    const [seInserto,setSeInserto]=useState(false);
    const [cargaronReclamos,setCargaronReclamos]=useState(false);
    const [urlElegido,setUrlElegido]=useState("");
    const [opcionElegida,setOpcionElegida]=useState("");
    const [reclamos,setReclamos]=useState([]);
    const [reclamoSeleccionado,setReclamoSeleccionado]=useState({});
    const [sePusieronImagenes,setSePusieronImagenes]=useState(false);
    const [opcionElegidaCambio,setOpcionElegidaCambio]=useState("");


    const handleChangeOpciones=e=>{
        setOpcionElegida(String(e.value));
    }

    const handleChangeOpcionesCambio=e=>{
        setOpcionElegidaCambio(String(e.value));
    }

    const opcionesEstados=[
        {label:'Nuevo',value:'nuevo'},
        {label:'Abierto',value:'abierto'},
        {label:'En proceso',value:'enProceso'},
        {label:'Desestimado',value:'desestimado'},
        {label:'Anulado',value:'anulado'},
        {label:'Terminado',value:'terminado'}
    ]
    const busqueda=e=>{
        async function fetchReclamos(){
            try{
                const response=await fetch(e);
                if(response.ok){
                    const data=await response.json().then(data=>setReclamos(data)).then(setCargaronReclamos(true));
                }
            }
            catch(e){
                alert("El dato ingresado es erroneo");
            }
            
        }
        fetchReclamos();
    }

    const enviarCambio=e=>{
        async function fetchCambioEstado(){
            const url="http://localhost:8080/api/reclamos?usuario="+localStorage.getItem("user")+
            "&estadoNuevo="+opcionElegidaCambio+
            "&numeroReclamo="+reclamoSeleccionado.numero+
            "&motivo="+document.getElementById("textomotivo").value;
            const response=await fetch(url,{method:'PUT'});
            if(response.ok){
                alert("El cambio se realizó con éxito");
            }
            else{
                alert("Algo salió mal");
            }
        }
        fetchCambioEstado();
        setCargaronReclamos(false);
    }

    const seleccionReclamo=e=>{
        let indice=parseInt(document.getElementById("codigoreclamover").value)-1;
        setReclamoSeleccionado(reclamos[indice]);


        setSeSelecciono(true);
    }

    async function hacerInserts(){
        if(!seInserto && cargaronReclamos){
            await new Promise(r => setTimeout(r, 2000));
            document.getElementById("listaReclamos").innerHTML="";
            let huboInsert=false;
            for(const key in reclamos){
                huboInsert=true;
                let unidad=""
                if(reclamos[key].unidad!=null){
                    unidad="<p>Unidad: piso "+reclamos[key].unidad.piso+" numero "+reclamos[key].unidad.numero+"</p>";
                }
                document.getElementById("listaReclamos").innerHTML+="<li><div>"+
                "<p>Código: "+(parseInt(key)+1)+"</p>"+
                "<p>Id: "+reclamos[key].numero+"</p>"+
                "<p>Reclamante: "+reclamos[key].usuario.nombre+"</p>"+
                "<p>Edificio: "+reclamos[key].edificio.nombre+"</p>"+
                unidad+
                "<p>Ubicación: "+reclamos[key].ubicacion+"</p>"+
                "<p>Descripcion: "+reclamos[key].descripcion+"</p>"+
                "<p>Estado: "+reclamos[key].estado+"</p>"+
                "</div></li>";
            }
            if(!huboInsert){
                document.getElementById("listaReclamos").innerHTML="<li><div>No hay reclamos que correspondan a la búsqueda</div></li>";
            }
            setSeInserto(true);
        }
    }
    hacerInserts();

    async function imagenes(){
        if(seSelecciono && !sePusieronImagenes){
            await new Promise(r => setTimeout(r, 2000));
            let imgs=reclamoSeleccionado.imagenes;
            document.getElementById("listaImagenes").innerHTML="";
            for(const key in imgs){
                document.getElementById("listaImagenes").innerHTML+="<li><div><img className='imagenCaja' src='"+imgs[key].direccion+"'/></div></li>";
            }
            setSePusieronImagenes(true);
        }
    }
    imagenes();


    if(seSelecciono){
        let unidad="";
        if(reclamoSeleccionado.unidad!=null){
            unidad="Unidad: piso "+reclamoSeleccionado.unidad.piso+" numero "+reclamoSeleccionado.unidad.numero;
        }
        return(
            <main>
                <div className='cajatamaniolinea'>
                    <div className="tituloLogoPerfil">
                        <img src={logo} className='item'/>
                        <h1 className='item'>Buscar Reclamos</h1 >
                        <img src={reclamosi} className='item'/>
                        <button onClick={()=>{setSeSelecciono(false);setSeInserto(false);setSePusieronImagenes(false);}} className='boton'><img src={flecha}/></button> 
                    </div>
                    <div className='linea'>
                    <ul><li>
                        <div>
                            <p>Id: {reclamoSeleccionado.numero}</p>
                            <p>Reclamante: {reclamoSeleccionado.usuario.nombre}</p>
                            <p>Edificio: {reclamoSeleccionado.edificio.nombre}</p>
                            {unidad}
                            <p>Ubicación: {reclamoSeleccionado.ubicacion}</p>
                            <p>Descripcion: {reclamoSeleccionado.descripcion}</p>
                            <p>Estado: {reclamoSeleccionado.estado}</p>
                        </div></li></ul>
                    <h2 className='textcentrado'>Imagenes:</h2>
                    <div className='cajaMuestralinea'>
                        <ul id='listaImagenes'>

                        </ul>
                    </div>
                    </div>
                    <h2>Cambio de estado</h2>
                    <div className='items'>
                        <div>
                            Nuevo estado:
                        <Select
                        placeholder='Seleccioná un estado'
                        options={opcionesEstados}
                        onChange={e => handleChangeOpcionesCambio(e)}
                    />
                        </div>
                        <div>
                            <p>Motivo:</p>
                            <textarea id='textomotivo' maxLength='1200'></textarea>
                        </div>
                    
                    </div>    
                    <button className='boton' onClick={enviarCambio}>Enviar</button>       
                </div>
            </main>
        )

    }
    else if(cargaronReclamos){
        return(
            <main>
                <div className='cajatamanio'>
                <div className="tituloLogoPerfil">
                    <img src={logo} className='item'/>
                    <h1 className='item'>Buscar Reclamos</h1 >
                    <img src={reclamosi} className='item'/>
                    <button onClick={()=>{setCargaronReclamos(false);setSeInserto(false);}} className='boton'><img src={flecha}/></button> 
                </div>
                <div className='cajaMuestra'>
                    <ul id='listaReclamos'>
                        Cargando...
                    </ul>
                </div>
                <div className='items'>
                    <input type='text' id='codigoreclamover' placeholder='Ingrese el código del reclamo que desee ver'/>
                    <button className='boton' onClick={seleccionReclamo}>Ver</button>
                </div>
                </div>
                
            </main>
        )
    }
    else{
    return (
        <main>
            <div className="caja">
                <div className="tituloLogoPerfil">
                    <img src={logo} className='item'/>
                    <h1 className='item'>Buscar Reclamos</h1 >
                    <img src={reclamosi} className='item'/>
                    <Link to='/reclamosadmin' className='boton'><img src={flecha}/></Link> 
                </div>
                <div className='borde'>
                    Buscar por Estado:
                    <Select
                        placeholder='Seleccioná un estado'
                        options={opcionesEstados}
                        onChange={e => handleChangeOpciones(e)}
                    />
                    <button className='boton centrado' onClick={e=>busqueda("http://localhost:8080/api/reclamos?usuario="+localStorage.getItem("user")+"&estado="+opcionElegida)}>Buscar</button>
                </div>
                <span className='centrado'>o</span>
                <div className='borde'>
                    Buscar por Persona:
                    <input type='text' id='bperdocu' placeholder='Ingrese el documento'/>
                    <button className='boton centrado' onClick={e=> busqueda("http://localhost:8080/api/reclamos/personas/"+(document.getElementById("bperdocu").value)+"?usuario="+localStorage.getItem("user"))}>Buscar</button>
                </div>
                <span className='centrado'>o</span>
                <div className='borde'>
                    Buscar por Edificio:
                    <input type='text' id='bedicodi' placeholder='Ingrese el código del edificio'/>
                    <button className='boton centrado' onClick={e => busqueda("http://localhost:8080/api/reclamos/edificios/"+document.getElementById("bedicodi").value+"?usuario="+localStorage.getItem("user"))}>Buscar</button>
                </div>
                <span className='centrado'>o</span>
                <div className='borde'>
                    <p>Buscar por Unidad:</p>
                    <div>
                    <input type='text' className='inputTres' id='bunicodi' placeholder='Ingrese el código del edificio'/>
                    <input type='text' className='inputTres' id='bunipiso' placeholder='Ingrese el piso de la unidad'/>
                    <input type='text' className='inputTres' id='buninume' placeholder='Ingrese el número de la unidad'/>
                    </div>  
                    <button className='boton item centrado' onClick={e=>busqueda("http://localhost:8080/api/reclamos/unidades?codigoEdificio="+document.getElementById("bunicodi").value+"&piso="+
document.getElementById("bunipiso").value+"&usuario="+
localStorage.getItem("user")+"&numero="+document.getElementById("buninume").value
)} >Buscar</button>
                </div>
                <span className='centrado'>o</span>
                <button className='boton item' onClick={e => busqueda("http://localhost:8080/api/reclamos?usuario="+localStorage.getItem("user"))}>Buscar todos</button>
            </div>
        </main>
    )
}
}