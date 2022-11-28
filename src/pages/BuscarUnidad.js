import React,{Component} from 'react'


class BuscarUnidad extends Component{


    render(

    ){
        if(localStorage.getItem("admin")=="true"){
            return("hola");
        }
        else{
            window.location.pathname("/");
        }
    }

}


export default BuscarUnidad