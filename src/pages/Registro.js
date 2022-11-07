import React,{ Component } from 'react';
import logo from '../imagenes/logo.png'
import Formulario from '../componentes/FormularioRegistro.js'
import '../pagesCss/Registro.css';

class Registro extends Component {

    handleSubmit = event =>{
        console.log("Se mandó el formulario");
      }


    render() {
        return(
            <div className="Registro">
      <main className="Registro-main">
      <div class="caja">
        <div class="logo-container">
          <img src={logo} class="logo"></img>
        </div>
        <h1>
          Registro
        </h1>
        <p>
          Bienvenido al  sistema de reclamos
        </p>
        <Formulario handleSubmit={this.handleSubmit}/>
        </div>
      </main>
    </div>
        );
    }

}


export default Registro;