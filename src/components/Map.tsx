import React, { useState, useEffect } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { type CSSProperties } from 'react';

function Map({
  props,
  position = '-34.745 -38.523',
  selectedLocation,
}: {
  props: boolean;
  position: string | null;
  selectedLocation: (coordinate: string) => void | null;
}) {
  const containerStyle: CSSProperties = {
    width: '360px',
    height: '360px',
    borderRadius: '20px',
  };

  const latPos = position?.split(' ')[0];
  const lngPos = position?.split(' ')[1];

  const center = {
    lat: Number(latPos) || -34.745,
    lng: Number(lngPos) || -38.523,
  };
  const isLoaded = props;

  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (map && center) {
      map.panTo(center);
      map.setZoom(12);
    }
  }, [map, center.lat, center.lng]);

  return (
    <>
      {isLoaded && (
        <GoogleMap
          onLoad={(map) => setMap(map)}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={(e) => {
            selectedLocation(`${e.latLng?.lat()} ${e.latLng?.lng()}`);
            console.log(`${e.latLng?.lat()} ${e.latLng?.lng()}`);
          }}
        ></GoogleMap>
      )}
    </>
  );
}
// use key props to force a re-render

export default React.memo(Map);
