import React,{Component,useState, useEffect, useCallback} from 'react'
import flecha from '../imagenes/flecha.png'
import logo from '../imagenes/logo.png'
import accionesi from '../imagenes/log.png'
import { Link } from 'react-router-dom'

export default function BuscarAcciones(){
    const[cargaron, setCargaron]=useState(false);
    const[acciones,setAcciones]=useState([]);
    const[inserts,setInserts]=useState(false);


    async function fetchAcciones(){
        if(!cargaron){
            const url="http://localhost:8080/api/acciones";
            const response=await fetch(url);
            if(response.ok){
                const data=await response.json();
                setAcciones(data);
                setCargaron(true);
            }
            
        }
    }
    fetchAcciones();

    async function insertar(){
        if(!inserts && cargaron){
            await new Promise(r => setTimeout(r, 1000));
            document.getElementById("listaacciones").innerHTML="";
            const hayAcciones=false;
            for(const key in acciones){
                hayAcciones=true;
                document.getElementById("listaacciones").innerHTML+="<li><div>"+
                "<p>Usuario: "+acciones[key].usuario.nombre+"</p>"+
                "<p>Fecha y hora: "+acciones[key].fechaHora+"</p>"+
                "<p>Operación: "+acciones[key].operacion+"</p>"+
                "<p>Tipo de entidad: "+acciones[key].entidad+"</p>"+
                "<p>Id de la entidad: "+acciones[key].idEntidad+"</p>"+
                "<p>Descripción: "+acciones[key].descripcion+"</p>"+
                "</div></li>"
            }
            if(!hayAcciones){
                document.getElementById("listaacciones").innerHTML="<li><div>No hay acciones</div></li>";
            }
            setInserts(true);
        }
    }
    insertar();

    if(cargaron){
        return(
        <main>
            <div className="cajatamanio">
                <div className='tituloLogoPerfil'>
                    <img src={logo} className='item'/>
                    <h1 className='item'>Buscar Acciones</h1 >
                    <img src={accionesi} className='item'/>
                    <Link to='/acciones' className='boton'><img src={flecha}/></Link> 
                </div>

                <div className='cajaMuestra'>
                    <ul id="listaacciones">
                        Cargando...
                    </ul>
                </div>

            </div>
        </main>
        );
    }
    else{
        return(
            <main>
                <div className="caja">
                    <div className='tituloLogoPerfil'>
                        <img src={logo} className='item'/>
                        <h1 className='item'>Buscar Acciones</h1 >
                        <img src={accionesi} className='item'/>
                        <Link to='/acciones' className='boton'><img src={flecha}/></Link> 
                    </div>
    
                    <div className='cajaMuestra'>
                        <ul id="listaacciones">
                            Cargando...
                        </ul>
                    </div>
    
                </div>
            </main>
        )
    }

}