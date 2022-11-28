import '../App.css';
import React,{ Component } from 'react';
import logo from '../imagenes/logo.png'
import {Link} from 'react-router-dom';
import persona from '../imagenes/persona.webp';
import pass from '../imagenes/password.webp';

class Login extends Component {

  state={
    form:{
      username:'',
      password:''
    },
    user:{
      documento:'',
      nombre:''
    }
    }
  

  handleChange=async e=>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]:e.target.value
      }
    });
  }
  
  handleSubmit=event =>{

    event.preventDefault();

    let usuario = this.state.form.username;

    let contrasenia= this.state.form.password;

    async function getDatos(documento){
      let response= await fetch('http://localhost:8080/api/personas/'+documento+'?usuario='+usuario);
      response = response.json();
      return response;
    }
    
    async function login() {
      let response = await fetch('http://localhost:8080/api/personas?usuario='+usuario+'&contrasenia='+contrasenia);
      console.log(response);
      let data = await response.text();
      data=data.split("/");
      if(data[1]=='1'){
        let datos=(await getDatos(data[0]));
        
        console.log(datos);

        console.log("Es admin");

        localStorage.setItem("logeado","true");
        localStorage.setItem("user",usuario);
        localStorage.setItem("nombre",(await datos.valueOf().nombre));
        localStorage.setItem("documento",data[0]);
        localStorage.setItem("admin","true");
        window.location.pathname="/bienvenidaadmin";
      }
      else if(data[1]=='0'){
        let datos=await getDatos(data[0]);
        console.log("No es admin");
        localStorage.setItem("logeado","true");
        localStorage.setItem("user",usuario);
        localStorage.setItem("nombre",await datos.valueOf().nombre);
        localStorage.setItem("documento",data[0]);
        localStorage.setItem("admin","false");
        window.location.pathname="/bienvenidausuario";
      }
      else if(data[1]=='2' || data[1]=='3'){
        console.log("Contraseña o usuario incorrecto");
      }
    }

    login();

}
    
  
    render(){

    return (
      
         <div className="App">
        
          <main className="App-main">
           <div class="caja">
            <div class="logo-container">
            <img src={logo} class="logo"></img>
            </div>
            <h1 className='centrado'>
             Login
            </h1>
            <p className='centrado'>
             Bienvenido al  sistema de reclamos
            </p>
            <form onSubmit={this.handleSubmit}>
            <div class="grilla">
                <p>Usuario:</p>
                <div class="for">
                    <img src={persona} class="iPersona"/>
                    <input 
                    type="text" 
                    name="username" 
                    required
                    onChange={this.handleChange}
                    />
                </div>
            </div>
                <div class="grilla">
                    <p>Contraseña:</p>
                    <div class="for">
                        <img src={pass} class="iPersona"/>
                        <input type="password"
                         name="password" required
                         onChange={this.handleChange}/>
                    </div>
                </div>
                <div class="grilla">
                    <input class="boton" type="submit" value="Enviar"/>
                </div>
            </form>
        
  
           <p className='centrado'>¿No tienes cuenta? <Link to = "/registro">Registrate</Link></p>
  
          </div>
         </main>
         
        
        </div>
  
     
      
    );
    
    }
  }

  export default Login;