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
                await fetch(baseURL+dni+'?usuario='+usuario).then((datos)=> {return datos.json();})
                .then( (datos) =>{
                    document.getElementById("nombre").innerText="Nombre: "+datos.nombre
                }
                );
            }

            leerpersona();
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
                    <p id="nombre">
                        Nombre:
                    </p> 
                    
                    <button className='buscar' id='buscar' onClick={nombre => handleSubmit()} >
                        Buscar
                    </button>
                </div>
            </main>
        );
    }
}


export default LeerPersona;