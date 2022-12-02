import React,{Component,useState, useEffect, useCallback} from 'react'
import edificiosi from '../imagenes/edificios.png'
import logo from '../imagenes/logo.png'
import unidadesi from '../imagenes/capas.png'
import flecha from '../imagenes/flecha.png'
import {Link} from 'react-router-dom'
import {Carousel} from 'react-responsive-carousel'

export default function BuscarEdificio(){
    const [cargaronEdificios,setCargaronEdificios]=useState(false);
    const [hiceInserciones,setHiceInserciones]=useState(false);
    const [edificios,setEdificios]=useState([]);
    const [seSelecciono,setSeSelecciono]=useState(false);
    const [seleccionado,setSeleccionado]=useState({});
    const [recienVuelvo,setRecienVuelvo]=useState(false);
    const [cargaronUnidades,setCargaronUnidades]=useState(false);
    const [unidades,setUnidades]=useState([]);
    const [hiceInsercionesUnidad,setHiceInsercionesUnidad]=useState(false);
    const [recienVuelvoUnidad,setRecienVuelvoUnidad]=useState(false);
    const [seSeleccionoUnidad,setSeSeleccionoUnidad]=useState(false);
    const [unidadSeleccionada, setUnidadSeleccionada]= useState({});
    
    async function cargarEdificios(){
        if(!cargaronEdificios){
        let url='http://localhost:8080/api/edificios?usuario='+localStorage.getItem("user");
        const response=await fetch(url).then(data=>data.json()).then(datos=>{
            setEdificios(datos);
            setCargaronEdificios(true);
        });
    }
    }
    async function inserciones(){
        if(cargaronEdificios){
            if(!hiceInserciones || recienVuelvo){
                await new Promise(r => setTimeout(r, 1000));
                document.getElementById("listaedificios").innerHTML="";
                for(const key in edificios){
                    document.getElementById("listaedificios").innerHTML+="<li><div>"+
                    "<p>Codigo: "+edificios[key].codigo+"</p>"+
                    "<p>Nombre: "+edificios[key].nombre+"</p>"+
                    "<p>Dirección: "+edificios[key].direccion+"</p>"+
                    "</div></li>";
                }
                setHiceInserciones(true);
                setRecienVuelvo(false);
            }
        }
    }

    async function insercionesUnidades(){
        if(cargaronUnidades){
            if(!hiceInsercionesUnidad || recienVuelvoUnidad){
                await new Promise(r => setTimeout(r, 1000));
                console.log("entro");
                let hayUnidades=false;
                for(const key in unidades){
                    hayUnidades=true;
                    let habitado;
                    if(unidades[key].habitado){
                        habitado="Si"
                    }
                    else{
                        habitado="No"
                    }
                    document.getElementById("listaunidades").innerHTML+="<li><div>"+
                    "<p>Id: "+unidades[key].id+"</p>"+
                    "<p>Piso: "+unidades[key].piso+"</p>"+
                    "<p>Numero: "+unidades[key].numero+"</p>"+
                    "<p>Habitado: "+habitado+"</p>"+
                    "</div></li>";
                }
                if(!hayUnidades){
                    document.getElementById("listaunidades").innerHTML="<li><div>No hay unidades en este edificio!</div></li>"
                }

                setHiceInsercionesUnidad(true);
                setRecienVuelvoUnidad(false);
            }
        }
    }

    async function cargarUnidades(){
        if(!cargaronUnidades && seSelecciono){
            const url="http://localhost:8080/api/edificios/unidades?codigo="+seleccionado.codigo+"&usuario="+localStorage.getItem("user");
            const response=await fetch(url);
            if(response.ok){
                const data=await response.json().then(data=>{
                    setUnidades(data);
                    setCargaronUnidades(true);
                })
            }
        }
    }

    const seleccionEdificio =e =>{
        console.log("SA:"+seSelecciono);
        if((!seSelecciono) && cargarEdificios && hiceInserciones && 0<=parseInt(document.getElementById("campocodigo").value)-1 && edificios.length>=parseInt(document.getElementById("campocodigo").value)){
            console.log("Sa:"+seSelecciono);
            console.log(edificios[parseInt(document.getElementById("campocodigo").value)-1]);
            setSeleccionado(edificios[parseInt(document.getElementById("campocodigo").value)-1]);
            setSeSelecciono(true);     
            console.log("Sd:"+seSelecciono);
        }
        else{
            console.log("else");
        }
    }

    const seleccionUnidad=e =>{
        console.log("apretoboton");
        if((!seSeleccionoUnidad) && seSelecciono && hiceInsercionesUnidad && 0<=parseInt(document.getElementById("campoidunidad").value)-1 && unidades.length>=parseInt(document.getElementById("campoidunidad").value)){
            console.log("entroalif");
            setUnidadSeleccionada(unidades[parseInt(document.getElementById("campoidunidad").value)-1]);
            setSeSeleccionoUnidad(true);
        }
    }
    const volver =e =>{
        if(seSelecciono){
            setCargaronUnidades(false);
            setHiceInsercionesUnidad(false);
            setSeSelecciono(false);
            setRecienVuelvo(true);
        }
    }
    const volverUnidad =e =>{
        if(seSeleccionoUnidad){
            setSeSeleccionoUnidad(false);
            setRecienVuelvoUnidad(true);
        }
    }

    inserciones();

    cargarEdificios();

    cargarUnidades();

    insercionesUnidades();

    if(seSeleccionoUnidad){
        return(
            <main>
                <div className='caja'>
                    <div className='tituloLogoPerfil'>
                        <img src={logo} className='item'/>
                        <h1 className='item'>Unidad</h1 >
                        <img src={unidadesi} className='item'/>
                        <img src={flecha} onClick={volverUnidad} className="boton"/>
                    </div>
                </div>
            </main>
        )
    }
    else if(seSelecciono){
        if(cargaronUnidades){
            return(
                <main>
                    <div className='cajatamanio'>
                        <div className='tituloLogoPerfil'>
                            <img src={logo} className='item'/>
                            <h1 className='item'>Edificio</h1 >
                            <img src={edificiosi} className='item'/>
                            <img src={flecha} onClick={volver} className="boton"/>
                        </div>
                            <h2> Datos del edificio:</h2>
                            <p>Nombre:</p> 
                            <input type="text" id="nombreedi" defaultValue={seleccionado.nombre}></input>
                            <p>Direccion:</p> 
                            <input type="text" id="direccionedi" defaultValue={seleccionado.direccion}></input>
                            <div className='items'>
                                <button type="submit" className="boton item" onClick={() => { if (window.confirm('¿Estás seguro que querés borrar el edificio?')){console.log("Borre el edificio")} } }>Borrar edificio</button>
                                <button type="submit" className="boton item" onClick={()=>{if (window.confirm('¿Estás seguro que querés modificar los datos del edificio?')){console.log("modificar")}}}>Modificar</button>
                            </div>
                            <h2>Unidades</h2>
                            <div className="cajaMuestra">
                                <ul id="listaunidades">

                                </ul>
                            </div>
                            <div className="items">
                                <input type="text" id="campoidunidad" placeholder='Ingresá el id de la unidad que quieras ver'/>
                                <button className='boton' onClick={seleccionUnidad}>Ver</button>
                            </div>
                        
                </div>
            </main>
        );
        }
        else{
            return(
                <main>
                    <div className='caja'>
                        <div className='tituloLogoPerfil'>
                            <img src={logo} className='item'/>
                            <h1 className='item'>Edificio</h1 >
                            <img src={edificiosi} className='item'/>
                            <img src={flecha} onClick={volver} className="boton"/>
                        </div>
                            <h2> Datos del edificio:</h2>
                            <p>Nombre:</p> 
                            <input type="text" id="nombreedi" defaultValue={seleccionado.nombre}></input>
                            <p>Direccion:</p> 
                            <input type="text" id="direccionedi" defaultValue={seleccionado.direccion}></input>
                            <div className='items'>
                                <button type="submit" className="boton item" onClick={() => { if (window.confirm('¿Estás seguro que querés borrar el edificio?')){console.log("Borre el edificio")} } }>Borrar edificio</button>
                                <button type="submit" className="boton item" onClick={()=>{if (window.confirm('¿Estás seguro que querés modificar los datos del edificio?')){console.log("modificar")}}}>Modificar</button>
                            </div>
                            <h2>Unidades</h2>
                            <div className="cajaMuestra">
                                Cargando...
                            </div>
                            <div className="items">
                                <input type="text" id="campoidunidad" placeholder='Ingresá el id de la unidad que quieras ver'/>
                                <button className='boton' onClick={seleccionUnidad}>Ver</button>
                            </div>
                        
                </div>
            </main>
            );
        }
    }
    else if(cargaronEdificios){
            return(
                <main>
                    <div className='cajatamanio'>
                        <div className='tituloLogoPerfil'>
                            <img src={logo} className='item'/>
                            <h1 className='item'>Buscar Edificios</h1 >
                            <img src={edificiosi} className='item'/>
                            <Link to="/edificios"><img src={flecha}  className="boton"/></Link> 
                        </div>
                        <div className='cajaMuestra'>
                            <ul id='listaedificios'>  
                            </ul>
                        </div>
                        <div>
                            <input type='text' id='campocodigo' placeholder='Ingresá el código del edificio que te interese ver'></input> <button className='boton' onClick={seleccionEdificio}>Ver</button>
                        </div>
                    </div>
                </main>
            )
        }
    else{
        return(
            <main>
            <div className='caja'>
                <div className='tituloLogoPerfil'>
                    <img src={logo} className='item'/>
                    <h1 className='item'>Buscar Edificios</h1 >
                    <img src={edificiosi} className='item'/>
                    <Link to="/edificios"><img src={flecha}  className="boton"/></Link> 
                </div>
                <div className='cajaMuestra'>
                    <ul>
                        Cargando...  
                    </ul>

                </div>
                <div>
                    <input type='text' placeholder='Ingresá el código del edificio que te interese ver'></input> <button className='boton'>Ver</button>
                </div>
            </div>
        </main>
        )
    }
    

}