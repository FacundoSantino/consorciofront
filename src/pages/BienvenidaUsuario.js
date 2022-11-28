import React,{Component} from 'react'
import logo from '../imagenes/logo.png'
import persona from '../imagenes/persona.webp'
import genR from '../imagenes/generarReclamo.png'
import conR from '../imagenes/consultarReclamo.png'
import { Link } from 'react-router-dom'

class BienvenidaUsuario extends Component{
    
    cerrarSesion=e=>{
        localStorage.setItem("logeado","false");
        localStorage.setItem("user","");
        localStorage.setItem("nombre","");
        localStorage.setItem("documento","");
        localStorage.setItem("admin","false");
    }
    

    render(){

      let nombre='Pedro';
      if(localStorage.getItem("logeado")=="true"){
        if(localStorage.getItem("admin")=="true"){
            window.location.pathname="/bienvenidaadmin";
        }
                                    
        let nombre=localStorage.getItem("nombre");
        return(
        
        <main className='clase'>
             <div className='caja'>
                 <div className='tituloLogoPerfil'>
                     <img src={logo} className='img'/>
                     <h1> ¡Bienvenido, {nombre}!</h1>
                     <Link to="/" onClick={this.cerrarSesion}><img src={persona} className='iPersona iconoFondo'/></Link>
                 </div>
                 <div className='items'>
                     <div className='item'>
                         <img src={genR}/>
                         <Link to="/generarreclamo"><button className='boton'>Generar reclamo</button></Link>
                     </div>
                     <div className='item'>
                     <img src={conR}/>
                         <Link to="/consultarreclamos"><button className='boton'>Consultar reclamos</button></Link>
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

export default BienvenidaUsuario