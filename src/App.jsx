import { useState, useEffect } from "react";
import { Box, CircularProgress, CssBaseline, Grid } from "@mui/material";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlaceData } from "./api/apis";
import './style.css';

const App = () => {
  const [type, setType] = useState("restaurants");
  const [rates, setRates] = useState(0);
  
  const [coordinates, setCoordinates] = useState();
  const [bounds, setBounds] = useState({});
  
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);

  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);

  useEffect(() => {
    if (!coordinates) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setCoordinates({ lat: latitude, lng: longitude });
        }
      );
    } 
    }, []);

  useEffect(() => {
    if (Number(rates)) {
      const filtered = places?.filter((place) => place.rating > rates);
      setFilteredPlaces(filtered);
    }
    else setFilteredPlaces([]);
  }, [rates]);

  useEffect(() => {
    if(bounds?.sw && bounds?.ne){
    setIsLoading(true);

    getPlaceData(type,bounds.sw, bounds.ne)
     .then((data) => {
       setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
       setFilteredPlaces([]);
       setRates(0); 
       setIsLoading(false);
    });
   }
  }, [type, bounds]);
  
  const onLoad = (autoC) => {
    setAutocomplete(autoC);
  };

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoordinates({ lat, lng });
  };
  
  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      {coordinates ? (
        <Grid container spacing={3} sx={{ width: "100%" }}>
          <Grid item xs={12} md={4}>
            <List
              isLoading={isLoading}
              childClicked={childClicked}
              places={filteredPlaces.length ? filteredPlaces : places}
              type={type}
              setType={setType}
              rates={rates}
              setRates={setRates}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Map
              setChildClicked={setChildClicked}
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates}
              places={filteredPlaces.length ? filteredPlaces : places}
            />
          </Grid>
        </Grid>
      ) : (
        <Box
          sx={{
            height: "95vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size="5rem" />
        </Box>
      )}
    </>
  );
};

export default App;
