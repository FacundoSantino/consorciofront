import { useState } from "react";
import '../componentes/CloudinaryUploader.css';
//import cloudinary from "cloudinary/lib/cloudinary"



function CloudinaryUploader() {

    const [images, setImages] = useState([]);
    const [imagesToRemove, setImagesToRemove] = useState(null);
    

    
    

    function handleRemoveImg(imgObj) {
        /*async function borrar(id) {
            const cloudinary = require('cloudinary').v2;
            const express = require('express');
            const navegador = express();
        
            cloudinary.config({
                cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.API_KEY,
                api_secret: process.env.API_SECRET
            });

            navegador.delete (async (req, res) => {
                await cloudinary.uploader.destroy(id);}
                
                

            )
            
        }*/
        
        

        setImagesToRemove(imgObj.public_id);
        //aca agregar el delete de la BD
        //borrar(imgObj.public_id);
        setImagesToRemove(null);
        setImages((prev) => prev.filter( (img) => img.public_id !== imgObj.public_id));
        console.log("se debería borrar");

        
        
        
       
            
        

    }

    function handleOpenWidget() {
        var myWidget = window.cloudinary.createUploadWidget({
            cloudName: 'dxpa2hk8o', 
            uploadPreset: 'arpfatwk'}
            , 
            (error, result) => { 
              if (!error && result && result.event === "success") { 
                //console.log('Done! Here is the image info: ', result.info);
                setImages((prev) => [...prev, {url: result.info.url, public_id: result.info.public_id}])
              }
            }
          );
        myWidget.open();
    }

    return (
        <div className="uploader">
            <button id= "upload-widget-cloudinary" className="cloudinary-button" onClick={() => handleOpenWidget()}>
                Subir imagen
            </button>
            <div className="images-preview-caja" id="cajaPreview">
                {images.map((image) => (
                    <div className="image-preview" id="imagenPreview">
                        <img className='imagenCloudinary' src = {image.url}/>
                        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
                        {imagesToRemove != image.public_id && <i class="fa fa-times close-icon" onClick={() => handleRemoveImg(image)}>
                        </i>}
                    </div>
                ))}
            </div>

        </div>
    );
}

export default CloudinaryUploader; 