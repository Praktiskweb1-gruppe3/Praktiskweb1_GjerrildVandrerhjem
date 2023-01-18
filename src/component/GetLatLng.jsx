import React, {useState} from 'react';
import {Marker, useMapEvents} from 'react-leaflet';

const GetLatLng = () => {
    const [ position, setPosition ] = useState( null )
    
    const map = useMapEvents( {
      click ( e ) {
        console.log( e.latlng )
        setPosition( [ e.latlng.lat, e.latlng.lng ] );
  
      }
    } )
  
    return (
      <>
        {
          position &&
          <Marker position={ position }>
  
        </Marker>
        }
      </>
  
    )
}

export default GetLatLng