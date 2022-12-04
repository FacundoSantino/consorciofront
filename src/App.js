import './App.css';
import React,{ Component } from 'react';
import BienvenidaAdmin from './pages/BienvenidaAdmin.js'
import BienvenidaUsuario from './pages/BienvenidaUsuario.js'
import Registro from './pages/Registro'
import Edificios from './pages/Edificios.js'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Login from './pages/Login'
import GenerarReclamo from './pages/GenerarReclamo.js'
import ReclamosAdmin from './pages/ReclamosAdmin.js'
import Acciones from './pages/Acciones.js' 
import Personas from './pages/Personas.js'
import GenerarEdificio from './pages/GenerarEdificio.js' 
import GenerarPersona from './pages/GenerarPersona.js'
import LeerPersona from './pages/LeerPersona.js'
import BuscarEdificio from './pages/BuscarEdificio.js'
import ConsultarReclamos from './pages/ConsultarReclamos.js';
import BuscarAcciones from './pages/BuscarAcciones.js';
import BuscarReclamo from './pages/BuscarReclamo.js';


function App() {
  
  
  return (

    
  
    <Routes>
      <Route path = "/registro" element={<Registro/>}/>
      <Route path = "/" element={<Login/>}/>
      <Route path= "/bienvenidaadmin" element={<BienvenidaAdmin/>}/>
      <Route path="/bienvenidausuario" element={<BienvenidaUsuario/>}/>
      <Route path="/generarreclamo" element ={<GenerarReclamo/>}/>
      <Route path="/personas" element ={<Personas/>}/>
      <Route path="/edificios" element ={<Edificios/>}/>
      <Route path="/reclamosadmin" element ={<ReclamosAdmin/>}/>
      <Route path="/acciones" element ={<Acciones/>}/>
      <Route path="/generaredificio" element ={<GenerarEdificio/>}/>
      <Route path="/generarpersona" element ={<GenerarPersona/>}/>
      <Route path="/leerpersona" element ={<LeerPersona/>}/>
      <Route path="/buscaredificio" element={<BuscarEdificio/>}/>
      <Route path="/consultarreclamos" element={<ConsultarReclamos/>}/>
      <Route path="/buscaracciones" element={<BuscarAcciones/>}/>
      <Route path="/buscarreclamo" element={<BuscarReclamo/>}/>
    </Routes>
 

  )

}

export default App;