import React,{Component,useState, useEffect, useCallback} from 'react'
import reclamos from '../imagenes/reclamos.png'
import logo from '../imagenes/logo.png'
import flecha from '../imagenes/flecha.png'
import {Link} from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class ConsultarReclamos extends Component{

    fetchReclamosHandler=async event => {
        localStorage.setItem("reclamoloading","true");
        try {
          const response = await fetch('http://localhost:8080/api/reclamos/personas/'+localStorage.getItem("documento")+'?usuario='+localStorage.getItem("user"));
          if (!response.ok) {
            throw new Error('Something went wrong');
          }
          const data = await response.json();
          const loadedReclamos = [];
          for(const key in data){
            loadedReclamos.push({
                id:data[key].numero,
                edificio: data[key].edificio,
                ubicacion:data[key].ubicacion,
                descripcion:data[key].descripcion,
                unidad:data[key].unidad,
                estado:data[key].estado,
                imagenes:data[key].imagenes
            })
          }
          console.log(data);
    
          this.recetas=loadedReclamos;

          console.log(loadedReclamos);
          document.getElementById("listaReclamos").innerHTML="";
          for(const key in loadedReclamos){
            let imagenresultado;
            if(loadedReclamos[key].imagenes.length>0){
              let concatimg="";
              for(const keyi in loadedReclamos[key].imagenes){
                concatimg+=" <img className='imagenslide' src='"+loadedReclamos[key].imagenes[keyi].direccion+"'}/>";
              }
              imagenresultado="<button type='button' className='collapsible'>Mostrar imagenes</button>"+
              "<div className='content'>"+"<div className='contenedorimagenesreclamos'>"+concatimg+"</div>"+
              "</div>";
              console.log(imagenresultado);
            }
            if(imagenresultado==undefined){
              imagenresultado="<p>No hay imagenes que mostrar.</p>"
            }
            document.getElementById("listaReclamos").innerHTML=document.getElementById("listaReclamos").innerHTML+
            "<li>"+
            "<div className='cajareclamocard'>"+
              "<p>Id: "+loadedReclamos[key].id+"</p>"+
              "<p>Edificio: "+loadedReclamos[key].edificio.nombre+loadedReclamos[key].edificio.direccion+"</p>"+
              "<p>"+(loadedReclamos[key].unidad!=null ? "Unidad: numero "+loadedReclamos[key].unidad.numero+" piso "+loadedReclamos[key].unidad.piso : "")+"</p>"+
              "<p>Ubicación: "+loadedReclamos[key].ubicacion+"</p>"+
              "<p>Descripcion: "+loadedReclamos[key].descripcion+"</p>"+
              "<p>Estado: "+loadedReclamos[key].estado+"</p>"+
              imagenresultado+
            "</div>"+
          "</li>"
          }
    
          
        } catch (error) {
          console.log(error.message);
        }
        localStorage.setItem("reclamoloading","false");
      };

    render(){
        const recetas=[];

        const content=[];

      
        if(localStorage.getItem("logeado")=="true"){
            return(
                
                <main>
                    <div className='caja limitador'>
                        <div className='tituloLogoPerfil'>
                          <img src={logo} className='item'/>
                          <h1 className='item'>Consultar Reclamos</h1 >
                          <img src={reclamos} className='item'/>
                          <Link to="/bienvenidausuario"><img src={flecha}  className="boton"/></Link> 
                        </div>
                        <div className='cajaMuestra'>
                            <ul id="listaReclamos">
                            </ul>
                        </div>
                        <button onClick={this.fetchReclamosHandler}>Buscar</button>
                    </div>
                </main>
                );
        }
        else{
            window.location.pathname("/");
        }
    }

}


export default ConsultarReclamos