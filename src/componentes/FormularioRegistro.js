import './FormularioRegistro.css';
import React,{Component} from 'react';
import persona from '../imagenes/persona.webp';
import pass from '../imagenes/password.webp';
import documento from '../imagenes/documento.png';

class FormularioRegistro extends Component{

    handleSubmit=event =>{
        async function fetchRegistro(){
            event.preventDefault();
            const url="http://localhost:8080/api/personas/registro?usuario="+document.getElementById("usuario").value+"&contrasenia="+document.getElementById("contrasenia").value+"&documento="+document.getElementById("documento").value;
            const response=await fetch(url,{method:'PUT'});
            if(response.status==201){
                alert("Usuario creado exitosamente");
                window.location.pathname="/";
            }
            else{
                fetch(url,{method:'PUT'})
  .then((response) => response.body)
  .then((rb) => {
    const reader = rb.getReader();

    return new ReadableStream({
      start(controller) {
        // The following function handles each data chunk
        function push() {
          // "done" is a Boolean and value a "Uint8Array"
          reader.read().then(({ done, value }) => {
            // If there is no more data to read
            if (done) {
              console.log('done', done);
              controller.close();
              return;
            }
            // Get the data and send it to the browser via the controller
            controller.enqueue(value);
            // Check chunks by logging to the console
            console.log(done, value);
            push();
          });
        }

        push();
      },
    });
  })
  .then((stream) =>
    // Respond with our stream
    new Response(stream, { headers: { 'Content-Type': 'text/html' } }).text()
  )
  .then((result) => {
    // Do things with result
    alert(result);
  });

            }
          }
          fetchRegistro();
    }

    render(){
        

        return(
            <form onSubmit={this.handleSubmit}>
            <div class="grilla">
                <p>Usuario:</p>
                <div class="for">
                    <img src={persona} class="iPersona"/>
                    <input type="text" id='usuario'required/>
                </div>
            </div>
                <div class="grilla">
                    <p>Contraseña:</p>
                    <div class="for">
                        <img src={pass} class="iPersona"/>
                        <input type="text" id='contrasenia'required/>
                    </div>
                </div>
                    <div class="grilla">
                        <p>Documento:</p>
                        <div class="for">
                            <img src={documento} class="iPersona"/>
                            <input type="text" id='documento' required/>
                        </div>
                    </div>

                
                <div class="grilla">
                    <input class="boton" type="submit" value="Enviar"/>
                </div>
            </form>
        );
    }
}

export default FormularioRegistro;