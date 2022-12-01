import React,{Component,useState, useEffect, useCallback} from 'react'
import edificiosi from '../imagenes/edificios.png'
import logo from '../imagenes/logo.png'
import flecha from '../imagenes/flecha.png'
import {Link} from 'react-router-dom'

export default function BuscarEdificio(){
    const [cargaronEdificios,setCargaronEdificios]=useState(false);
    const [hiceInserciones,setHiceInserciones]=useState(false);
    const [edificios,setEdificios]=useState([]);
    
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
            if(!hiceInserciones){
                document.getElementById("listaedificios").innerHTML="";
                for(const key in edificios){
                    document.getElementById("listaedificios").innerHTML+="<li><div>"+
                    "<p>Codigo: "+edificios[key].codigo+"</p>"+
                    "<p>Nombre: "+edificios[key].nombre+"</p>"+
                    "<p>Dirección: "+edificios[key].direccion+"</p>"+
                    "</div></li>";
                }
                setHiceInserciones(true);
            }
        }
    }

    inserciones();

    cargarEdificios();



    if(cargaronEdificios){
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
                        <ul id='listaedificios'>  
                        </ul>
                    </div>
                    <div>
                        <input type='text' placeholder='Ingresá el código del edificio que te interese ver'></input> <button className='boton'>Ver</button>
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