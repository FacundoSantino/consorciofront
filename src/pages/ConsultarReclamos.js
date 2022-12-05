import React,{Component,useState, useEffect, useCallback} from 'react'
import reclamosi from '../imagenes/reclamos.png'
import logo from '../imagenes/logo.png'
import flecha from '../imagenes/flecha.png'
import {Link} from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Select from 'react-select'

export default function ConsultarReclamos(){
        const [cargaronReclamos, setCargaronReclamos] = useState (false);
        const [reclamos, setReclamos] = useState ([]);

        const [hiceInserciones,setHiceInserciones]=useState(false);
        const [recienVuelvo,setRecienVuelvo]=useState(false);
        const [seSelecciono,setSeSelecciono]=useState(false);
        const [seleccionado,setSeleccionado]=useState({});
        const[sePusieronImagenes,setSePusieronImagenes]=useState(false);
        const[seHizoFetchCambios,setSeHizoFetchCambios]=useState(false);
        const[insertamosCambios,setInsertamosCambios]=useState(false);
        const[cambios,setCambios]=useState([]);


       

        async function cargarReclamos() {
          if (!cargaronReclamos) {
            
            let url = 'http://localhost:8080/api/reclamos/personas/'+localStorage.getItem("documento")+'?usuario='+localStorage.getItem("user");
          
            
            await fetch(url).then(data=>data.json()).then(datos=>{
              setReclamos(datos);
              setCargaronReclamos(true);
              console.log(datos);
            })

          }
        }
        async function insercionReclamo() {
          if(cargaronReclamos) {
            if(!hiceInserciones || recienVuelvo){
              await new Promise(r => setTimeout(r, 1200));
              document.getElementById("listaReclamosBox").innerHTML="";
              for(const key in reclamos){
                document.getElementById("listaReclamosBox").innerHTML+="<li><div>"+
                "<p>Codigo de Posición: "+(parseInt(key)+1)+"</p>"+
                "<p>Id Reclamo: "+reclamos[key].numero+"</p>"+
                "<p>Documento Reclamante: "+reclamos[key].usuario.documento+"</p>"+
                "<p>Edificio: "+reclamos[key].edificio.nombre+"</p>"+
                "<p>Piso: "+reclamos[key].unidad.piso+" Numero: "+reclamos[key].unidad.numero+"</p>"+
                "<p>Ubicacion: "+reclamos[key].ubicacion+"</p>"+
                "<p>Descripcion: "+reclamos[key].descripcion+"</p>"+
                "<p>Estado: "+reclamos[key].estado+"</p>"+
                "</div></li>";
              }
              setHiceInserciones(true);
              setRecienVuelvo(false);

            }
            

          }
        }
        cargarReclamos();
        insercionReclamo();
        
        const seleccionReclamo =e =>{
          if((!seSelecciono) && cargarReclamos && hiceInserciones && 0<=parseInt(document.getElementById("campocodigo").value)-1 && reclamos.length>=parseInt(document.getElementById("campocodigo").value)) {
            setSeleccionado(reclamos[parseInt(document.getElementById("campocodigo").value)-1]);
            setSeSelecciono(true);
            imagenes();
            
        }

      

        }
        async function imagenes(){
          if(seSelecciono && !sePusieronImagenes){
              await new Promise(r => setTimeout(r, 2000));
              let imgs=seleccionado.imagenes;
              document.getElementById("listaImagenes").innerHTML="";
              for(const key in imgs){
                  document.getElementById("listaImagenes").innerHTML+="<li><div><img className='imagenCaja' src='"+imgs[key].direccion+"'/></div></li>";
              }
              setSePusieronImagenes(true);
          }
      }
      imagenes();
   
        const recetas=[];

        const content=[];

        const volver =e =>{
          if(seSelecciono){
            setSeSelecciono(false);
            setRecienVuelvo(true);
            setSeHizoFetchCambios(false);
            setInsertamosCambios(false);
            setSePusieronImagenes(false);
        }
        }
        
      async function fetchCambioEstado(){
        if(seSelecciono && !seHizoFetchCambios){
          console.log("fetchcambio");
          const url="http://localhost:8080/api/reclamos/cambios?usuario="+localStorage.getItem("user")+"&idReclamo="+seleccionado.numero;
          const response=await fetch(url).then(data => data.json()).then(res=> setCambios(res));
          setSeHizoFetchCambios(true);
        }
      }

      async function insertsCambios(){
        if(!insertamosCambios && seSelecciono){
          console.log("insercion");
          document.getElementById("listacambios").innerHTML="";
          for(const key in cambios){
            document.getElementById("listacambios").innerHTML+="<li><div>"+
            "<p>Fecha y hora: "+cambios[key].fechaHora+"</p>"+
            "<p>Descripción: "+cambios[key].descripcion+"</p>"+
            "</div></li>";
          }
          setInsertamosCambios(true);
        }
      }
      insertsCambios();

      fetchCambioEstado();
      
        if(localStorage.getItem("logeado")=="true"){


          if(seSelecciono) {
            let unidad="";
            if(seleccionado.unidad!=null){
                unidad="Unidad: piso "+seleccionado.unidad.piso+" numero "+seleccionado.unidad.numero;
            }
            
            return(
              <main>
                <div className='cajatamaniolinea'>
                    <div className="tituloLogoPerfil">
                        <img src={logo} className='item'/>
                        <h1 className='item'>Buscar Reclamos</h1 >
                        <img src={reclamosi} className='item'/>
                        <button onClick={()=>{volver()}} className='boton'><img src={flecha}/></button> 
                    </div>
                    <div className='linea'>
                    <ul><li>
                        <div>
                            <p>Id: {seleccionado.numero}</p>
                            <p>Reclamante: {seleccionado.usuario.nombre}</p>
                            <p>Edificio: {seleccionado.edificio.nombre}</p>
                            {unidad}
                            <p>Ubicación: {seleccionado.ubicacion}</p>
                            <p>Descripcion: {seleccionado.descripcion}</p>
                            <p>Estado: {seleccionado.estado}</p>
                        </div></li></ul>
                    <h2 className='textcentrado'>Imagenes:</h2>
                    <div className='cajaMuestralinea'>
                        <ul id='listaImagenes'>

                        </ul>
                    </div>
                    </div>
                    <h2>Cambios de estado</h2>
                    
                        <div className='cajaMuestra'>
                          <ul id='listacambios'>

                          </ul>
                        </div>
                       
                       
                </div>
            </main>

            );

          }
          else {
            return(
                
              <main>
                  <div className='cajatamanio'>
                      <div className='tituloLogoPerfil'>
                        <img src={logo} className='item'/>
                        <h1 className='item'>Consultar Reclamos</h1 >
                        <img src={reclamosi} className='item'/>
                        <Link to="/bienvenidausuario"><img src={flecha}  className="boton"/></Link> 
                      </div>
                      <div className='cajaMuestra'  >
                          <ul id='listaReclamosBox' >
                              Cargando...
                          </ul>
                      </div>
                      <div>
                          <input type='text' id='campocodigo' placeholder='Ingresá el código de posición del reclamo que te interese ver'></input> <button className='boton' onClick={seleccionReclamo}>Ver</button>
                      </div>
                      
                  </div>
              </main>
              );
          }
            
        }
        else{
            window.location.pathname("/");
        }
    }



