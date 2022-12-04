import React, {Component, useEffect, useState } from 'react'
import personasi from '../imagenes/personas.png'
import logo from '../imagenes/logo.png'
import flecha from '../imagenes/flecha.png'
import {Link} from 'react-router-dom'


export default function LeerPersona(){
    const [cargaronPersonas,setCargaronPersonas]=useState(false);
    const [personas,setPersonas]=useState([]);
    const [hiceInserciones,setHiceInserciones]=useState(false);



    async function fetchPersonas(){
        if(!cargaronPersonas){
            console.log("entrofetch");
            const url="http://localhost:8080/api/personas?usuario="+localStorage.getItem("user");
            const response=await fetch(url).then(data=>data.json()).then(data=>setPersonas(data)).then(setCargaronPersonas(true));
        }
    }
    fetchPersonas();

    async function insercionesPersonas(){
        if(!hiceInserciones && cargaronPersonas){
            await new Promise(r => setTimeout(r, 1200));
            console.log("entroinsert");
            document.getElementById("listapersonas").innerHTML="";
            for(const key in personas){
                document.getElementById("listapersonas").innerHTML+="<li><div>"+
                "<p>Nombre: "+ personas[key].nombre+"</p>"+
                "<p>Documento: "+personas[key].documento+"</p>"+
                "</div></li>"
            }
            setHiceInserciones(true);
        }
    }

    insercionesPersonas();

    


        const baseURL = "http://localhost:8080/api/personas/";

         const handleSubmit=event =>{
            let dni = document.getElementById("dni").value;
            let usuario = localStorage.getItem("user");
            

            async function leerpersona() {
                const response=await fetch(baseURL+dni+'?usuario='+usuario);
                if(response.ok){
                    const data=await response.json().then(datos=> document.getElementById("nombre").value=datos.nombre)
                }
                else{
                    document.getElementById("nombre").value="No existe nadie con ese documento";
                }
            }

            leerpersona();
         }

         const modificarNombre=event =>{
            let nombreAGuardar=document.getElementById("nombre").value;
            console.log("llego");
            let usuario=localStorage.getItem("user");
            async function mandarUpdate(){
                let url="http://localhost:8080/api/personas?usuario="+usuario+"&documento="+document.getElementById("dni").value+"&nombreNuevo="+document.getElementById("nombre").value;
                await fetch(url,{method:'PUT'}).then(response =>{if(response.ok){alert("El cambio fue exitoso")}}).then((a)=>{setCargaronPersonas(false);setHiceInserciones(false);});
            }
            mandarUpdate();
         }

         
        if(cargaronPersonas){
            return( 
                <main className='clase'>
                    <div className='cajatamanio'>
                        <div className='tituloLogoPerfil'>
                            <img src={logo} className='item'/>
                            <h1 className='item'>Buscar Persona</h1 >
                            <img src={personasi} className='item'/>
                            <Link to='/personas' className='boton'><img src={flecha}/></Link> 
                        </div>
                        <div className='cajaMuestra'>
                            <ul id='listapersonas'>
                                Cargando...
                            </ul>
                        </div>
                        
                        
                        <form onSubmit={handleSubmit}>
                        <input type="text" name="dni" id="dni" placeholder='Ingrese el documento deseado'></input>
                        </form>
                        <p>
                            Nombre:<input type='text' id='nombre'></input>
                        </p> 
    
                        <button className='boton' onClick={modificarNombre}>
                            Modificar nombre
                        </button>
                        
                        <button className='boton buscar' id='buscar' onClick={handleSubmit} >
                            Buscar
                        </button>
                    </div>
                </main>
         );

        }
        else{
        return( 
            <main className='clase'>
                <div className='caja'>
                    <div className='tituloLogoPerfil'>
                        <img src={logo} className='item'/>
                        <h1 className='item'>Buscar Persona</h1 >
                        <img src={personasi} className='item'/>
                        <Link to='/personas' className='boton'><img src={flecha}/></Link> 
                    </div>
                    <div className='cajaMuestra'>
                        <ul id='listapersonas'>
                            Cargando...
                        </ul>
                    </div>
                    
                    
                    <form onSubmit={handleSubmit}>
                    <input type="text" name="dni" id="dni" placeholder='Ingrese el documento deseado'></input>
                    </form>
                    <p>
                        Nombre:<input type='text' id='nombre'></input>
                    </p> 

                    <button className='boton' onClick={modificarNombre}>
                        Modificar nombre
                    </button>
                    
                    <button className='boton buscar' id='buscar' onClick={handleSubmit} >
                        Buscar
                    </button>
                </div>
            </main>
     );
    }
}