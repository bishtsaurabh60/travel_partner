import GoogleMapReact from "google-map-react";
import {Box} from '@mui/material';
import sxStyle from "./styles";
import mapStyles from "../../mapStyles";
import MapPlace from "./MapPlace";

const Map = ({setCoordinates,setBounds,coordinates,places,setChildClicked}) => {
  const { mapContainer } = sxStyle();
  return (
    <Box sx={mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => {
          setChildClicked(child);
        }}
      >
        {places?.length &&
          places.map((place, i) => (
            <MapPlace
              place={place}
              key={i}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
            />
          ))}
      </GoogleMapReact>
    </Box>
  );
};

export default Map;