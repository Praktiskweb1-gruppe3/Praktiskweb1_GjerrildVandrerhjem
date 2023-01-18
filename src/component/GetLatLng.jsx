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

// Used this in the comonent where the map should be clickable to get lat and long
/*const handleClick = ( e ) => {

    const { lat, lng } = e.latlng;
    console.log( lat, lng );

  }*/

export default GetLatLng