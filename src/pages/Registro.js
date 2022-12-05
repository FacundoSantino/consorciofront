import React,{ Component } from 'react';
import logo from '../imagenes/logo.png'
import Formulario from '../componentes/FormularioRegistro.js'
import '../App.css';
import {Link} from 'react-router-dom';

class Registro extends Component {

    handleSubmit = event =>{
      }


    render() {
        return(
            <div className="Registro">
      <main className="Registro-main">
        <div class="caja">
           <div class="logo-container">
              <img src={logo} class="logo"></img>
            </div>
            <h1 className='centrado'>
              Registro
            </h1>
            <p className='centrado'>
             Bienvenido al  sistema de reclamos
            </p>
            <Formulario handleSubmit={this.handleSubmit}/>

            <p className='centrado'>¿Ya tenés cuenta?<Link to = "/"> Inicia sesión</Link></p>
        </div>
      </main>
    </div>
        );
    }

}


export default Registro;