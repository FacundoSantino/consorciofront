import React,{Component} from 'react'
import logo from '../imagenes/logo.png'
import persona from '../imagenes/persona.webp'
import edificios from '../imagenes/edificios.png'
import reclamos from '../imagenes/reclamos.png'
import personas from '../imagenes/personas.png'
import acciones from '../imagenes/log.png'
import { Link } from 'react-router-dom'


class BienvenidaAdmin extends Component{

    cerrarSesion=e=>{
        localStorage.setItem("logeado","false");
        localStorage.setItem("user","");
        localStorage.setItem("nombre","");
        localStorage.setItem("documento","");
        localStorage.setItem("admin","false");
    }
    
    
    render(){

        if(localStorage.getItem("admin")=="true"){
                                    
            let nombre=localStorage.getItem("nombre");
  
            return(
                <main>
                <div className='clase'>
                     <div className='caja'>
                         <div className='tituloLogoPerfil'>
                             <img src={logo} className='imagen'/>
                             <h1> ¡Bienvenido, {nombre}!</h1>
                             <Link to="/" onClick={this.cerrarSesion}><img src={persona} className='iPersona iconoFondo'/></Link>
                         </div>
                         <div className='items'>
                             <div className='item1'>
                                 <img src={edificios}/>
                                 <Link to='/edificios' ><button className='boton'>Edificios</button></Link>
                             </div>
   
                             <div className='item3'>
                                 <img src={reclamos}/>
                                 <Link to='/reclamosadmin' ><button className='boton'>Reclamos</button></Link>
                             </div>
                             <div className='item4'>
                                 <img src={personas}/>
                                 <Link to='/personas' ><button className='boton'>Personas</button></Link>
                             </div>
                             <div className='item5'>
                                 <img src={acciones}/>
                                 <Link to='/acciones' ><button className='boton'>Acciones</button></Link>
                             </div>
                         </div>
                     </div>
                </div>
                </main>
             )
            
        }
        else{
          window.location.pathname="/"
        }

      }
}


export default BienvenidaAdmin