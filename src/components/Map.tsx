import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { type CSSProperties } from 'react';

function Map({
  props,
  position = '37.4648 126.9572',
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
    lat: Number(latPos) || 37.4648,
    lng: Number(lngPos) || 126.9572,
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
          }}
        >
          <Marker
            position={center}
            icon={'/src/assets/icons/pin-destination.svg'}
          />
        </GoogleMap>
      )}
    </>
  );
}
// use key props to force a re-render

export default React.memo(Map);
