import './Formulario.css';
import React,{Component} from 'react';
import persona from '../imagenes/persona.webp';
import pass from '../imagenes/password.webp';

class Formulario extends Component{

    handleSubmit=event =>{
        console.log('Se mandó el formulario');
    }

    render(){
        

        return(
            <form onSubmit={this.handleSubmit}>
            <div class="grilla">
                <p>Usuario:</p>
                <div class="for">
                    <img src={persona} class="iPersona"/>
                    <input type="text" required/>
                </div>
            </div>
                <div class="grilla">
                    <p>Contraseña:</p>
                    <div class="for">
                        <img src={pass} class="iPersona"/>
                        <input type="text" required/>
                    </div>
                </div>
                <div class="grilla">
                    <input class="boton" type="submit" value="Enviar"/>
                </div>
            </form>
        );
    }
}

export default Formulario;