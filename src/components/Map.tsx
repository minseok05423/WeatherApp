import React from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { type CSSProperties } from 'react';

function Map({
  props,
  position = '-34.745 -38.523',
}: {
  props: boolean;
  position: string | null;
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

  return (
    <>
      {isLoaded && (
        <GoogleMap
          key={`${center.lat}-${center.lng}`}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
        ></GoogleMap>
      )}
    </>
  );
}
// use key props to force a re-render

export default React.memo(Map);
