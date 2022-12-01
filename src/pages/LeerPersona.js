import React, {Component, useEffect, useState } from 'react'
import personas from '../imagenes/personas.png'
import logo from '../imagenes/logo.png'
import flecha from '../imagenes/flecha.png'
import Select from 'react-select'
import axios from "axios"
import {Link} from 'react-router-dom'


class LeerPersona extends Component{
    
    state={
        dni: '',
        usuario: '',
        nombreEncontrado: 'no hay busquedas',
        nombre: ''
    }


    handleChange=async e=>{
        this.setState({
          form:{
            ...this.state.form,
            [e.target.name]:e.target.value
          }
        });
        console.log(this.state.form);
        
    }

    render(){


        const baseURL = "http://localhost:8080/api/personas/";

         const handleSubmit=event =>{
            let dni = this.state.form.dni;
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
                await fetch(url,{method:'PUT'}).then(response =>{if(response.ok){alert("El cambio fue exitoso")}});
            }
            mandarUpdate();
         }

         

        return( 
            <main className='clase'>
                <div className='caja'>
                    <div className='tituloLogoPerfil'>
                        <img src={logo} className='item'/>
                        <h1 className='item'>Buscar Persona</h1 >
                        <img src={personas} className='item'/>
                        <Link to='/personas' className='boton'><img src={flecha}/></Link> 
                    </div>
                    
                    <form onSubmit={this.handleSubmit}>
                    <input type="text" name="dni" id="dni" onChange={this.handleChange}></input>
                    </form>
                    <p>
                        Nombre:<input type='text' id='nombre'></input>
                    </p> 

                    <button className='boton' onClick={modificarNombre}>
                        Modificar nombre
                    </button>
                    
                    <button className='boton buscar' id='buscar' onClick={nombre => handleSubmit()} >
                        Buscar
                    </button>
                </div>
            </main>
        );
    }
}


export default LeerPersona;