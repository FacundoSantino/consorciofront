import React,{Component} from 'react'
import logo from '../imagenes/logo.png'
import borrar from '../imagenes/tacho.png'
import crear from '../imagenes/crear.png'
import leer from '../imagenes/leer.png'
import modificar from '../imagenes/modificar.png'
import flecha from '../imagenes/flecha.png'
import { Link } from 'react-router-dom'



class Edificios extends Component{

    render(){
        if(localStorage.getItem("admin")=="true"){
        return(
            <main className='clase'>
                  <div className='caja'>
                      <div className='tituloLogoPerfil'>
                          <img src={logo} className='imagen'/>
                          <h1>Edificios</h1>
                          <Link to='/bienvenidaadmin' ><button className='boton'><img src={flecha}/></button></Link>
                      </div>
                      <div className='items'>
                          <div className='item'>
                              <img src={crear}/>
                              <Link to='/generaredificio' ><button className='boton'>Generar</button></Link>
                          </div>
                        
                          <div className='item'>
                              <img src={leer}/>
                              <Link to='/buscaredificio' ><button className='boton'>Buscar</button></Link>
                          </div>
                      </div>
                  </div>
             </main>
        );
        }
        else{
            window.location.pathname="/"
        }
    }

}

export default Edificios;