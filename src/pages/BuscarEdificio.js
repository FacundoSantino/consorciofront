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
    const [dueniosSeleccionada, setDueniosSeleccionada]=useState([]);
    const [inquilinosSeleccionada, setInquilinosSeleccionada]=useState([]);
    const [hiceInsercionesPersonas,setHiceInsercionesPersonas]=useState(false);

    
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
                    "<p>Codigo de Posición: "+(parseInt(key)+1)+"</p>"+
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
                document.getElementById("listaunidades").innerHTML="";
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
                    "<p>Codigo de Posición: "+(parseInt(key)+1)+"</p>"+
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

    async function insercionesPersonas(){
        if(!hiceInsercionesPersonas && cargaronUnidades && seSeleccionoUnidad){
            await new Promise(r => setTimeout(r, 1000));
            document.getElementById("listaduenios").innerHTML="";
            document.getElementById("listainquilinos").innerHTML="";
            let insd=0;
            let insi=0;
            for(const key in inquilinosSeleccionada){
                document.getElementById("listainquilinos").innerHTML+="<li><div>"+
                "<p>Nombre: "+inquilinosSeleccionada[key].nombre+"</p>"+
                "<p>Documento: "+inquilinosSeleccionada[key].documento+"</p>"+
                "</div></li>"
                ;
                insi++;
            }
            for(const key in dueniosSeleccionada){
                document.getElementById("listaduenios").innerHTML+="<li><div>"+
                "<p>Nombre: "+dueniosSeleccionada[key].nombre+"</p>"+
                "<p>Documento: "+dueniosSeleccionada[key].documento+"</p>"+
                "</div></li>"
                ;
                insd++;
            }
            if(insi==0){
                document.getElementById("listainquilinos").innerHTML+="<li><div>"+
                "<p>No hay inquilinos en esta unidad</p>"+
                "</div></li>"
                ;
            }
            if(insd==0){
                document.getElementById("listaduenios").innerHTML+="<li><div>"+
                "<p>No hay duenios en esta unidad</p>"+
                "</div></li>"
                ;
            }
            
            setHiceInsercionesPersonas(true);
        }
    }
    insercionesPersonas();

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
            setUnidadSeleccionada(unidades[parseInt(document.getElementById("campoidunidad").value)-1]);
            async function traerPersonas(){
                const urlduenios="http://localhost:8080/api/unidades/duenios?codigoEdificio="+seleccionado.codigo+"&piso="+unidadSeleccionada.piso+"&numero="+unidadSeleccionada.numero+"&usuario="+localStorage.getItem("user");
                const urlinquilinos="http://localhost:8080/api/unidades/inquilinos?codigoEdificio="+seleccionado.codigo+"&piso="+unidadSeleccionada.piso+"&numero="+unidadSeleccionada.numero+"&usuario="+localStorage.getItem("user");
                const responseduenios=fetch(urlduenios).then(data=>data.json()).then(data=>setDueniosSeleccionada(data));
                const responseinquilinos=fetch(urlinquilinos).then(data=>data.json()).then(data=>setInquilinosSeleccionada(data));
            }
            traerPersonas();
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
            setHiceInsercionesPersonas(false);
        }
    }

    inserciones();

    cargarEdificios();

    cargarUnidades();

    insercionesUnidades();

    const borrarEdificio=e=>{
        if (window.confirm('¿Estás seguro que querés borrar el edificio?')){
        async function fetchBorrarEdificio(){
            const url="http://localhost:8080/api/edificios/"+seleccionado.codigo+"?usuario="+localStorage.getItem("user");
            const response=await fetch(url,{method:'DELETE'});
            if(response.ok){
                alert("Se ha borrado con éxito");
                if(seSelecciono){
                    setCargaronUnidades(false);
                    setHiceInsercionesUnidad(false);
                    setSeSelecciono(false);
                    setRecienVuelvo(true);
                    setCargaronEdificios(false);
                }
            }
            else{
                alert("No se ha podido borrar el edificio");
            }
                    
        }
        fetchBorrarEdificio();
    }
    }
    const modificarEdificio=e=>{
        if (window.confirm('¿Estás seguro que querés modificar los datos del edificio?')){
        async function fetchModificarEdificio(){
            const url="http://localhost:8080/api/edificios/"+parseInt(seleccionado.codigo)+"?usuario="+localStorage.getItem("user")+"&nombre="+document.getElementById("nombreedi").value+"&direccion="+document.getElementById("direccionedi").value;
            const response=await fetch(url,{method:'PUT'});
            if(response.ok){
                alert("Se modificaron los datos exitosamente");
                setCargaronEdificios(false);
            }
            else{
                alert("No se pudo modificar los datos.");
                }
            }
        fetchModificarEdificio();
        }
    }
    const modificarUnidad=e=>{
        if (window.confirm('¿Estás seguro que querés modificar los datos de la unidad?')){
            async function fetchModificarUnidad(){
                const url="http://localhost:8080/api/unidades/"+unidadSeleccionada.id+"?usuario="+localStorage.getItem("user")+
                "&piso="+document.getElementById("ingresopiso").value+
                "&numero="+document.getElementById("ingresonumero").value;
                const response=await fetch(url,{method:'PUT'});
                if(response.ok){
                    alert("Los datos se modificaron exitosamente");
                    setCargaronUnidades(false);
                }
                else{
                    alert("No se pudieron modificar los datos");
                }
            }
            fetchModificarUnidad();
        }
    }
    const borrarUnidad= e =>{
        if (window.confirm('¿Estás seguro que querés borrar la unidad?')){
            async function fetchBorrarUnidad(){
                const url="http://localhost:8080/api/unidades/"+unidadSeleccionada.id+"?usuario="+localStorage.getItem("user");
                const response=await fetch(url,{method:'DELETE'});
                if(response.ok){
                    alert("La unidad se borró exitosamente");
                    setCargaronUnidades(false);
                    setSeSeleccionoUnidad(false);
                    setRecienVuelvoUnidad(true);
                    setHiceInsercionesPersonas(false);
                }
                else{
                    alert("No se pudo borrar la unidad");
                }
            }
            fetchBorrarUnidad();
        }
    }
    const agregarUnidad= e =>{
        async function fetchAgregarUnidad(){
            const url="http://localhost:8080/api/edificios/unidades?numero="+document.getElementById("numeroUnidadAgregar").value+
            "&piso="+document.getElementById("pisoUnidadAgregar").value+
            "&edificioId="+seleccionado.codigo+
            "&usuario="+localStorage.getItem("user");
            const response=await fetch(url,{method:'POST'});
            if(response.ok){
                alert("Unidad agregada exitosamente");
                setCargaronUnidades(false);
                setHiceInsercionesUnidad(false);
            }
            else{
                alert("No se pudo agregar la unidad");
            }
        }
        fetchAgregarUnidad();
    }
    const transferirDuenio=e=>{
        async function fetchTransferirDuenio(){
            const url="";
            const response=fetch(url);
            if(response.ok){
                alert("ok");
            }
            else{
                alert("nook");
            }
        }
        fetchTransferirDuenio();
    }
    const agregarDuenio=e=>{
        async function fetchAgregarDuenio(){
            const url="";
            const response=fetch(url);
            if(response.ok){
                alert("ok");
            }
            else{
                alert("nook");
            }
        }
        fetchAgregarDuenio();
    }
    const transferirInquilino=e=>{
        async function fetchTransferirInquilino(){
            const url="";
            const response=fetch(url);
            if(response.ok){
                alert("ok");
            }
            else{
                alert("nook");
            }
        }
        fetchTransferirInquilino();
    }
    const agregarInquilino=e=>{
        async function fetchAgregarInquilino(){
            const url="";
            const response=fetch(url);
            if(response.ok){
                alert("ok");
            }
            else{
                alert("nook");
            }
        }
        fetchAgregarInquilino();
    }
    const liberar=e=>{
        async function fetchLiberar(){
            const url="";
            const response=fetch(url);
            if(response.ok){
                alert("ok");
            }
            else{
                alert("nook");
            }
        }
        fetchLiberar();
    }
    

    if(seSeleccionoUnidad){
        return(
            <main>
                <div className='cajatamanio'>
                    <div className='tituloLogoPerfil'>
                        <img src={logo} className='item'/>
                        <h1 className='item'>Unidad</h1 >
                        <img src={unidadesi} className='item'/>
                        <img src={flecha} onClick={volverUnidad} className="boton"/>
                    </div>
                    <h2>Datos de la unidad:</h2>
                    <div className='ingresoDatos'>
                        <div className='ingre'>
                        <h3>Id:</h3>
                        <input type='text' defaultValue={unidadSeleccionada.id} disabled/>
                        </div>
                        <div className='ingre'>
                        <h3>Piso:</h3>
                        <input type='text' id="ingresopiso" defaultValue={unidadSeleccionada.piso}/>
                        </div>
                        <div className='ingre'>
                        <h3>Número:</h3>
                        <input type='text' id="ingresonumero" defaultValue={unidadSeleccionada.numero}/>
                        </div>
                    </div>
                    <div className='items'>
                        <button className='boton item' onClick={modificarUnidad}>Modificar</button>
                        <button className='boton item' onClick={borrarUnidad}>Borrar</button>
                    </div>
                    <h2>Dueños:</h2>
                    <div className='cajaMuestra'>
                        <ul id='listaduenios'>
                            Cargando...
                        </ul>
                    </div>
                    <input type='text' placeholder='Ingrese el documento deseado'/>
                    <div className='items'>
                        <button className='boton item'>Transferir</button>
                        <button className='boton item'>Agregar Dueño</button>
                    </div>
                    <h2>Inquilinos:</h2>
                    <div className='cajaMuestra'>
                        <ul id='listainquilinos'>
                            Cargando...
                        </ul>
                    </div>
                    <input type='text' placeholder='Ingrese el documento deseado'/>
                    <div className='items'>
                        <button className='boton item'>Transferir</button>
                        <button className='boton item'>Agregar Inquilino</button>
                        <button className='boton item'>Liberar</button>
                    </div>
                </div>
            </main>
        )
    }
    else if(seSelecciono){
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
                                <button type="submit" className="boton item" onClick={borrarEdificio}>Borrar edificio</button>
                                <button type="submit" className="boton item" onClick={modificarEdificio}>Modificar</button>
                            </div>
                            <h2>Unidades</h2>
                            <div className="cajaMuestra">
                                <ul id="listaunidades">
                                    Cargando...
                                </ul>
                            </div>
                            <div className="items">
                                <input type="text" id="campoidunidad" placeholder='Ingresá código de posición de la unidad que quieras ver'/>
                                <button className='boton' onClick={seleccionUnidad}>Ver</button>
                            </div>
                            <div className='items'>
                                <input type='text' className='inputChico' id='pisoUnidadAgregar' placeholder='Ingresá el piso de la unidad a agregar'/>
                                <input type='text' className='inputChico' id='numeroUnidadAgregar' placeholder='Ingresá el número de la unidad a agregar'/>
                                <button className='boton'onClick={agregarUnidad} >Agregar Unidad</button>
                            </div>
                            
                </div>
            </main>
        );
        
    }
    else{ 
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
                                Cargando...
                            </ul>
                        </div>
                        <div>
                            <input type='text' id='campocodigo' placeholder='Ingresá el código de posición del edificio que te interese ver'></input> <button className='boton' onClick={seleccionEdificio}>Ver</button>
                        </div>
                    </div>
                </main>
            )
        }

}