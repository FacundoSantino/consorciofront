import React, {Component} from 'react'
import personas from '../imagenes/personas.png'
import logo from '../imagenes/logo.png'
import flecha from '../imagenes/flecha.png'
import Select from 'react-select'
import {Link} from 'react-router-dom'


class GenerarPersona extends Component{
    
    
    

    render(){
    
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
                        <input type="text" placeholder='Ingrese el nombre'/>
                    </div>
                    <div className='item'>
                        <span>Documento</span>
                        <input type="text" placeholder='Ingrese el documento'/>
                    </div>
                    
                    
   
                    <button className='boton'>Generar</button>
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