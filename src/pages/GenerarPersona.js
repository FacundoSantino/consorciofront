import React, {Component} from 'react'
import personas from '../imagenes/personas.png'
import logo from '../imagenes/logo.png'
import flecha from '../imagenes/flecha.png'
import Select from 'react-select'
import {Link} from 'react-router-dom'


class GenerarPersona extends Component{
    
    
    

    render(){

        const generarPersona=e=>{
            let nombre=document.getElementById("ingresonombre").value;
            let documento=document.getElementById("ingresodocumento").value;
            let usuario=localStorage.getItem("user");

            async function crearPersona(){
                let url="http://localhost:8080/api/personas?usuario="+usuario+"&documento="+documento+"&nombre="+nombre;
                const response=await fetch(url,{method:'POST'});
                if(response.ok){
                    alert("Se agregó a la persona");
                }
                else{
                    alert("El documento ya está en uso");
                }
            }
            crearPersona();
        }
    
        if(localStorage.getItem("admin")=="true"){
        return(
            
            
            <main className='clase'>
                <div className='caja'>
                    <div className='tituloLogoPerfil'>
                        <img src={logo} className='item'/>
                        <h1 className='item'>Generar Persona</h1 >
                        <img src={personas} className='item'/>
                        <Link to="/personas"><img src={flecha}  className="boton"/></Link> 
                    </div>
                    

                    
                    <div className='item'>
                        <span>Nombre</span>
                        <input type="text" id='ingresonombre' placeholder='Ingrese el nombre'/>
                    </div>
                    <div className='item'>
                        <span>Documento</span>
                        <input type="text" id='ingresodocumento' placeholder='Ingrese el documento'/>
                    </div>
                    
                    
   
                    <button className='boton' onClick={generarPersona}>Generar</button>
                </div>

                
            </main>
            
        );
        }
        else{
            window.location.pathname="/";
        }
    }
}


export default GenerarPersona;