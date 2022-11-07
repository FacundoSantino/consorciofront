import React,{Component} from 'react'
import logo from '../imagenes/logo.png'
import persona from '../imagenes/persona.webp'
import '../pagesCss/BienvenidaUsuario.css'
import genR from '../imagenes/generarReclamo.png'
import conR from '../imagenes/consultarReclamo.png'

class BienvenidaUsuario extends Component{

    render(){

      let nombre='Pedro';

      return(
           <div className='clase'>
                <div className='caja'>
                    <div className='tituloLogoPerfil'>
                        <img src={logo} className='imagen'/>
                        <h1> ¡Bienvenido, {nombre}!</h1>
                        <img src={persona} className='imagenP'/>
                    </div>
                    <div className='items'>
                        <div className='item'>
                            <img src={genR}/>
                            <input type='Submit' value='Generar reclamo' className='button'/>
                        </div>
                        <div className='item'>
                        <img src={conR}/>
                            <input type='Submit' value='Consultar reclamos' className='button'/>
                        </div>
                    </div>
                </div>
           </div>
        )
    }

}

export default BienvenidaUsuario