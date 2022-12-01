import React, {Component} from 'react'
import edificios from '../imagenes/edificios.png'
import logo from '../imagenes/logo.png'
import flecha from '../imagenes/flecha.png'
import Select from 'react-select'
import {Link} from 'react-router-dom'


class GenerarEdificio extends Component{
    
    
    

    render(){

        const generarEdificio=e=>{
            let nombre=document.getElementById("ingresonombre").value;
            let direccion=document.getElementById("ingresodireccion").value;
            let usuario=localStorage.getItem("user");

            async function crearEdificio(){
                let url="http://localhost:8080/api/edificios?usuario="+usuario+"&direccion="+direccion+"&nombre="+nombre;
                const response=await fetch(url,{method:'POST'});
                if(response.ok){
                    alert("Se creó el edificio");
                }
                else{
                    alert("No se pudo crear el edificio");
                }
            }
            crearEdificio();
        }
    
        if(localStorage.getItem("admin")=="true"){
        return(
            
            
            <main>
                <div className='caja'>
                    <div className='tituloLogoPerfil'>
                        <img src={logo} className='item'/>
                        <h1 className='item'>Generar Edificio</h1 >
                        <img src={edificios} className='item'/>
                        <Link to="/edificios"><img src={flecha}  className="boton"/></Link>  
                    </div>
                    
                    <div className='item'>
                        <span>Nombre</span>
                        <input type="text" id='ingresonombre' placeholder='Ingrese el nombre'/>
                    </div>
                    <div className='item'>
                        <span>Dirección</span>
                        <input type="text" id='ingresodireccion' placeholder='Ingrese la dirección'/>
                    </div>
                    
                    <button className='boton' onClick={generarEdificio}>Generar</button>


                </div>
                
            </main>
            
        );
        }
        else{
            window.location.pathname="/"
        }
    }
}


export default GenerarEdificio;