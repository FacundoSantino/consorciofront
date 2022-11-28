import React, {Component} from 'react'
import reclamo from '../imagenes/generarReclamo100.png'
import logo from '../imagenes/logo.png'
import flecha from '../imagenes/flecha.png'
import Select from 'react-select'


class GenerarReclamo extends Component{

    
    constructor(){
        super();
        

        async function getPosibilidades(){
            const response= await fetch('http://localhost:8080/api/reclamos/consultar/?documento='+localStorage.getItem("documento"));
            const data=await response.json();
            alert(data.text());
            return data;
        }

        let data= getPosibilidades();
        
    }

    volver =e =>{
        if(localStorage.getItem("admin")=="true"){
            window.location.pathname="/reclamosadmin"
        }
        else{
            window.location.pathname="/bienvenidausuario"
        }
    }
    

    render(){


    
        
        const optionsEdificio = [
            {label:'Edificio uno',value:'edificiouno'},
            {label:'Edificio dos',value:'edificiodos'},
            {label:'Edificio tres',value:'edificiotres'}
        ]
        const optionsPiso = [
            {label:'1',value:'1'},
            {label:'2',value:'2'},
            {label:'3',value:'3'}
        ]
        const optionsNumero= [
            {label:'1',value:'1'},
            {label:'2',value:'2'},
            {label:'3',value:'3'}
        ]
          
        return(
            
            
            <main className='clase'>
                <div className='caja'>
                    <div className='tituloLogoPerfil'>
                        <img src={logo}/>
                        <h1>Generar Reclamo</h1>
                        <img src={reclamo}/>
                        <button className='boton' onClick={this.volver}> <img src={flecha}/> </button> 
                    </div>
                    <h2 className='datos'> DATOS DEL EDIFICIO </h2>
                    <div className='datosEdificio'>
                        <div id="edificio" className='drop'>
                            <span>Edificio</span>
                            <Select 
                                options={optionsEdificio} 
                                placeholder="Elegí un edificio" 
                                className="basic-single"
                                classNamePrefix="select"
                                name="Edificio"
                            />
                        </div>
                        <div id="piso"className='drop'>
                            <span>Piso</span>
                            <Select 
                                options={optionsPiso} 
                                placeholder="Elegí un piso" 
                                className="basic-single"
                                classNamePrefix="select"
                                name="Piso"
                            />
                        </div>
                        <div id="numero" className='drop'>
                            <span>Número</span>
                            <Select 
                                options={optionsNumero} 
                                placeholder="Elegí un número" 
                                className="basic-single"
                                classNamePrefix="select"
                                name="Numero"
                            />
                        </div>
                    </div>
                    <h2 className='proble'> PROBLEMÁTICA </h2>
                    <div className='problematica'>
                        <div className='drop'>
                            <span>Ubicación</span>
                            <textarea type="text"></textarea>
                        </div>
                        <div className='drop'>
                            <span>Descripción</span>
                            <textarea name="textarea"></textarea>
                        </div>
                        <div className='imagenes'>
                            <span>Imágenes</span>
                            <input type="file" multiple/>
                        </div>
                    </div>
                    <button className='boton'>Generar</button>


                </div>
                
            </main>
            
        );
    }
}


export default GenerarReclamo;