import './App.css';
import React,{ Component } from 'react';
import logo from './imagenes/logo.png'
import Formulario from './componentes/Formulario.js'

class App extends Component {
  
  handleSubmit = event =>{
    console.log("Se mandó el formulario");
  }

  render(){
  return (
    <div className="App">
      <main className="App-main">
      <div class="caja">
        <div class="logo-container">
          <img src={logo} class="logo"></img>
        </div>
        <h1>
          Login
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

export default App;