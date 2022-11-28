import React, {Component} from 'react'
import unidad from '../imagenes/capas.png'
import logo from '../imagenes/logo.png'
import flecha from '../imagenes/flecha.png'
import Select from 'react-select'
import {Link} from 'react-router-dom'


class GenerarUnidad extends Component{
    
    
    

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
                        <img src={logo} className='item'/>
                        <h1 className='item'>Generar Unidad</h1 >
                        <img src={unidad} className='item'/>
                        <Link to="/unidades"><img className="boton" src={flecha}/></Link>
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
                    
                    <button className='boton'>Generar</button>


                </div>
                
            </main>
            
        );
    }
}


export default GenerarUnidad;