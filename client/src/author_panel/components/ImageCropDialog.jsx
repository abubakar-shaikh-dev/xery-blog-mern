import React,{useState} from 'react'
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import "./css/ImageCropDialog.css"

export default function ImageCropDialog({ imageURL, cropInit, zoomInit, aspectInit, onCancel , genCroppedImg}) {

  
  if (zoomInit == null) {
    zoomInit = 1;
  }

  if (cropInit == null) {
    cropInit = { x: 0, y: 0 };
  }

  if (aspectInit == null) {
    aspectInit = 16 / 9;
  }

  const [zoom, setZoom] = useState(zoomInit);
  const [crop, setCrop] = useState(cropInit);
  const [aspect, setAspect] = useState(aspectInit);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCropHandle = async() => {
    const croppedImageURL = await getCroppedImg(imageURL,croppedAreaPixels);
    genCroppedImg(croppedImageURL);
  }

  return (
    <div className='fixed' style={{zIndex:'999999'}}>
      <div className="backdrop"></div>
      <div className="crop-container">
        <Cropper
          image={imageURL}
          zoom={zoom}
          crop={crop}
          aspect={aspect}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropComplete}
        />
      </div>
      <div className="controls">
        <div className="controls-upper-area">
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onInput={(e) => {
              onZoomChange(e.target.value);
            }}
            className="slider"
          ></input>
          
        </div>
        <div className="button-area">

        <button className="button-18 bg-[#0A66C2]" role="button" type="button" onClick={onCancel}>Cancel</button>
        <button className="button-18 bg-[#0A66C2]" role="button" type="button" onClick={onCropHandle}>Crop</button>


        </div>
      </div>
    </div>
  )
}