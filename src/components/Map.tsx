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
            icon={{
              url: `data:image/svg+xml;base64,${btoa(`<svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 0.625C11.8541 0.625129 13.6333 1.36177 14.9443 2.67285C16.2552 3.98391 16.9921 5.7622 16.9922 7.61621C16.9922 10.6131 15.2918 13.5363 13.6807 15.6494C12.8655 16.7186 12.0513 17.6083 11.4414 18.2305C11.1362 18.5418 10.881 18.7876 10.7012 18.9561C10.6117 19.0399 10.5404 19.1049 10.4912 19.1494C10.4667 19.1715 10.4469 19.1893 10.4336 19.2012C10.4272 19.2069 10.4216 19.2116 10.418 19.2148C10.4164 19.2162 10.415 19.2178 10.4141 19.2188L10.4121 19.2197V19.2207L10 19.5801L9.58887 19.2207L9.58301 19.2148C9.57942 19.2117 9.57382 19.2069 9.56738 19.2012C9.55412 19.1894 9.53428 19.1716 9.50977 19.1494C9.46058 19.105 9.38935 19.0399 9.2998 18.9561C9.12004 18.7877 8.86479 18.5418 8.55957 18.2305C7.94968 17.6083 7.13556 16.7186 6.32031 15.6494C4.75946 13.6023 3.11494 10.7956 3.01367 7.89746L3.00781 7.61621C3.00793 5.76207 3.74556 3.98394 5.05664 2.67285C6.3677 1.36192 8.14597 0.625121 10 0.625ZM10.001 4.6084C8.33952 4.6084 6.99219 5.95573 6.99219 7.61719C6.9925 9.27838 8.33971 10.625 10.001 10.625C11.6618 10.6245 13.0085 9.27806 13.0088 7.61719C13.0088 5.95605 11.662 4.60891 10.001 4.6084Z" fill="#FF4B4B"/></svg>`)}`,
              scaledSize: new google.maps.Size(40, 40),
              anchor: new google.maps.Point(20, 40)
            }}
          />
        </GoogleMap>
      )}
    </>
  );
}
// use key props to force a re-render

export default React.memo(Map);
