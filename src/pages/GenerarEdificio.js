import React, {Component} from 'react'
import edificios from '../imagenes/edificios.png'
import logo from '../imagenes/logo.png'
import flecha from '../imagenes/flecha.png'
import Select from 'react-select'
import {Link} from 'react-router-dom'


class GenerarEdificio extends Component{
    
    
    

    render(){
    
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
                        <input type="text" placeholder='Ingrese el nombre'/>
                    </div>
                    <div className='item'>
                        <span>Dirección</span>
                        <input type="text" placeholder='Ingrese la dirección'/>
                    </div>
                    
                    <button className='boton'>Generar</button>


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