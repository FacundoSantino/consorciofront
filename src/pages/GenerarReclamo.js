import React,{Component,useState, useEffect, useCallback} from 'react'


import reclamo from '../imagenes/generarReclamo100.png'
import logo from '../imagenes/logo.png'
import flecha from '../imagenes/flecha.png'
import Select from 'react-select'
import CloudinaryUploader from '../componentes/CloudinaryUploader'
import {Link} from 'react-router-dom'



export default function GenerarReclamo(){

    const [opcionesEdificioElegido,setOpcionesEdificioElegido]= useState("none");
    const [opcionesUnidadPisoElegido, setOpcionesUnidadPisoElegido] = useState("");



    
    const [opcionesTodos, setOpcionesTodos] = useState(
        [{label:'-',value:'-',}])

    const [obtuveEdificios,setObtuveEdificios] = useState(false);
    const [optionsEdificio, setOptionsEdificio] = useState([
        {label:'Cargando',value:'Cargando'},
    ])

    const listadoEdificios = [];
    const [unidadPisoPorEdificio, setUnidadPisoPorEdificio] = useState([[{label: '----', value: '----'}]]);

    const usuario = localStorage.getItem("user");
    const documentoUser = localStorage.getItem("documento");
        let pisosEdificio = [
            {label:'cargando', value:'cargando', edificio:'numero',piso:'numero'}
        ];
        
        
        async function ObtenerEdificios() {
            if(!obtuveEdificios) {
                setObtuveEdificios(true);
                let url = "http://localhost:8080/api/reclamos/consultar?documento="
                await fetch(url+documentoUser).then((datos)=> {return datos.json();})
                .then ((datos) =>{
                for (const key in datos) {
                    
                    listadoEdificios.push(key);

                }
                
           
                
                /*console.log(listadoEdificios);
                console.log(datos);
                console.log((datos["1"]));
                console.log((datos["1"]).length)
                
                console.log((datos["1"])[0]);
                
        
                console.log((datos["1"])[0].piso);*/

                let i=0;
                let j=0
                let arrayAux = [ {
                    "label" : "----------------",
                    "value" : "",
                    

                }];
                while (i <=listadoEdificios.length-1) {
                    let numAux = String(listadoEdificios[i]);
                    //let valueAux = String( "Edificio: "+listadoEdificios[i]);
                    var aux = {
                        "label" : numAux,
                        "value" : "&codigoEdificio="+listadoEdificios[i]
                    };
                    optionsEdificio.push(aux);
                    
                    
                    while (j <=(datos[numAux]).length-1) {
                        //console.log("edificio" + listadoEdificios[i]);
                        //console.log("piso" + (datos[numAux])[j].piso);
                        //console.log("numero" + (datos[numAux])[j].numero);
                
                        //console.log(valueAux);
                        

                        let valueAux2 = String("Numero: "+((datos[numAux])[j].piso)+", Piso: "+((datos[numAux])[j].numero))

                        
                        var aux2 = {
                            "label" : valueAux2,
                            "value" : "&codigoUnidad="+(datos[numAux])[j].id
                        }

                        
                        
                        arrayAux.push(aux2);
                        /*console.log(aux);
                        console.log(aux2);*/
                        


                        j=j+1
                    }
                    

                    unidadPisoPorEdificio.push(arrayAux);
        
                
                    arrayAux = [ {
                        "label" : "----------------",
                        "value" : "",
                    
    
                    }];
                    i= i+1;
                    j= 0;
                    //console.log(unidadPisoPorEdificio);
                }
                optionsEdificio.shift();
                unidadPisoPorEdificio.shift();

                setOptionsEdificio(optionsEdificio);
                setUnidadPisoPorEdificio(unidadPisoPorEdificio);
                //console.log(unidadPisoPorEdificio);
                
            })
            
            }

        }
        ObtenerEdificios();
        //console.log(optionsEdificio);
        //console.log(unidadPisoPorEdificio);
        
        //console.log(listadoEdificios);
        
        //console.log(unidadPisoPorEdificio);
    
/*
        for (let i=0; i<listadoEdificios.length;i++) {
            optionsEdificio.push(listadoEdificios[i]);
        } */

        function handleChange(e) {
            
            
            

            //document.getElementById("pisoUnidad").value = unidadPisoPorEdificio[0][0];
        
            //console.log(e.label);
            //console.log(e.value);
            setOpcionesEdificioElegido(String(e.value));
            
            //console.log(optionsEdificio.leng);

            let auxA = e.label;
            
            //console.log(optionsEdificio[0].label);
            
            for (let k = 0; k <= optionsEdificio.length-1;k++) {
                let auxB = optionsEdificio[k].label;
                if (auxA == auxB) {
                    //console.log("exito" + auxB);
                    //console.log(unidadPisoPorEdificio[k][0]);
                    //console.log(unidadPisoPorEdificio)
                    setOpcionesTodos(unidadPisoPorEdificio[k]);
                    
                    //console.log(document.getElementById("selectUnidadPiso"));
                    
                
                }
            }
            
            
            //console.log(opcionesTodos[0]);
            //console.log(parseInt(e.label));

        }

        function handleChangeUnidadPiso(e) {
            //console.log(e.label);
            //console.log(e.value);
            
            setOpcionesUnidadPisoElegido(String(e.value));
            
        }

        async function generadorReclamo() {
            /*console.log(opcionesEdificioElegido);
            console.log(opcionesUnidadPisoElegido);
            console.log(document.getElementById("ubicacion").value);
            console.log(document.getElementById("descripcion").value);*/
            let url2 = 'http://localhost:8080/api/reclamos?documento='+documentoUser+
            '&usuario='+usuario+String(opcionesEdificioElegido)+String(opcionesUnidadPisoElegido)+
            '&ubicacion='+String(document.getElementById("ubicacion").value)+
            '&descripcion='+String(document.getElementById("descripcion").value);

          
            await fetch(url2,{method : 'POST'}).then((datos)=> {return datos.json();})
            .then((datos) => {
                document.getElementById("textoAuxGenerador").innerHTML = "Se ha generado el reclamo con exito con el id de reclamo:"+datos.idReclamo;
                imagenGenerador(datos.idReclamo);
            })
           

            

            

        }
        
        async function imagenGenerador(numeroReclamo) {
            //console.log(document.getElementById("imagenCloudinary").querySelector("#imagenPreview").getElementsByTagName("img")[0].src);
            //console.log(document.getElementById("imagenCloudinary").querySelector("#cajaPreview").getElementsByTagName("div")[1].getElementsByTagName("img")[0].src)
            let cantidadImg =   document.getElementById("imagenCloudinary").querySelector("#cajaPreview").getElementsByTagName("div").length;
            let url3 = 'http://localhost:8080/api/imagenes?tipo=png&idReclamo='+String(numeroReclamo)+"&usuario="+usuario;
            let srcImagenAux = "";
            for (let n= 0; n<=cantidadImg-1; n++) {
                srcImagenAux = document.getElementById("imagenCloudinary").querySelector("#cajaPreview").getElementsByTagName("div")[n].getElementsByTagName("img")[0].src;

                await fetch((url3+"&path="+srcImagenAux),{method: 'POST'});
                //document.getElementById("textoAuxGenerador").innerHTML = document.getElementById("textoAuxGenerador").innerHTML + "<pre>"+ "Se ha subido la imagen "+(n+1)+" con exito" +"</pre>";

                

            }
        }
    
       
        
  
       

          
        return(
            
            
            <main className='clase'>
                <div id="caja" className='caja'>
                    <div className='tituloLogoPerfil'>
                        <img src={logo} className='item'/>
                        <h1 className='item'>Generar Reclamo</h1 >
                        <img src={reclamo} className='item'/>
                        <Link id="volver" className='boton item' to={localStorage.getItem("admin")=="true" ?'/bienvenidaadmin' : '/bienvenidausuario'}> <img src={flecha}/> </Link> 
                    </div>
                    <h2 className='datos'> DATOS DEL EDIFICIO </h2>
                    <div className='datosEdificio' >
                        <div id="edificio" className='drop'>
                            <span>Edificio</span>
                            <form >
                            <Select  id='selectEdificio'
                                onChange={e => handleChange(e)} 
                                options={optionsEdificio} 
                                placeholder="Elegí un edificio" 
                                className="basic-single"
                                classNamePrefix="select"
                                name="Edificio"
                            />

                            </form>
                            
                        </div>
                        <div id="unidadPiso" className='drop'>
                            <span>Unidad y Piso</span>
                            <form  >
                            <Select name='selectUnidadPiso' id="selectUnidadPiso"
                                onChange={e => handleChangeUnidadPiso(e)} 
                                options={opcionesTodos} 
                                placeholder="Elegí una unidad y piso" 
                                className="basic-single"
                                classNamePrefix="select"
                                
                            
                                
                            />

                            </form>
                            
                        </div>
                        
                    </div>
                    <h2 className='proble'> PROBLEMÁTICA </h2>
                    <div className='problematica'>
                        <div className='drop'>
                            <span>Ubicación</span>
                            <textarea id='ubicacion' type="text"></textarea>
                        </div>
                        <div className='drop'>
                            <span>Descripción</span>
                            <textarea id='descripcion' name="textarea"></textarea>
                        </div>
                        <div className='imagenes' id='imagenCloudinary'>
                            <span>Imágenes</span>
                            <CloudinaryUploader/>
                        </div>
                    </div>
                    <button className='gen boton' onClick={() => generadorReclamo()}>Generar</button>
                    <p id='textoAuxGenerador'>

                    </p>


                </div>
                
            </main>
            
        );
    }


