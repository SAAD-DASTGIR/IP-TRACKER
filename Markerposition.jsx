import React,{useEffect} from "react";
import { Marker,Popup,useMap } from "react-leaflet";
import icon from "./Icon"
export default  function Markerposition({address}){
    
    const map = useMap()
    const position=[address.lat,address.lon]
    useEffect(() => {
      map.flyTo(position, 13, {
        animate: true,
      })
    }, [map, position])
    return(
        <>
            <Marker icon={icon} position={position}
            
            >
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </>
    )
}