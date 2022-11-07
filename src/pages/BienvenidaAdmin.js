import React,{Component} from 'react'
import logo from '../imagenes/logo.png'
import persona from '../imagenes/persona.webp'
import edificios from '../imagenes/edificios.png'
import capas from '../imagenes/capas.png'
import reclamos from '../imagenes/reclamos.png'
import personas from '../imagenes/personas.png'
import acciones from '../imagenes/log.png'
import '../pagesCss/BienvenidaAdmin.css'


class BienvenidaAdmin extends Component{
    
    
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
                          <div className='item1'>
                              <img src={edificios}/>
                              <input type='Submit' value='Edificios' className='button'/>
                          </div>
                        
                          <div className='item2'>
                              <img src={capas}/>
                              <input type='Submit' value='Unidades' className='button'/>
                          </div>

                          <div className='item3'>
                              <img src={reclamos}/>
                              <input type='Submit' value='Reclamos' className='button'/>
                          </div>
                          <div className='item4'>
                              <img src={personas}/>
                              <input type='Submit' value='Personas' className='button'/>
                          </div>
                          <div className='item5'>
                              <img src={acciones}/>
                              <input type='Submit' value='Acciones' className='button'/>
                          </div>
                      </div>
                  </div>
             </div>
          )
      }
}


export default BienvenidaAdmin