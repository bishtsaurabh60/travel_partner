import React, { useState, useEffect, Suspense } from "react";
import { Box, CircularProgress, CssBaseline, Grid } from "@mui/material";
import Header from "./components/Header/Header";
import { getPlaceData } from "./api/apis";
import "./style.css";

const List = React.lazy(() => import("./components/List/List"));
const Map = React.lazy(() => import("./components/Map/Map"));

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
    } else setFilteredPlaces([]);
  }, [rates]);

  useEffect(() => {
    if (bounds?.sw && bounds?.ne) {
      setIsLoading(true);

      getPlaceData(type, bounds.sw, bounds.ne).then((data) => {
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
            <Suspense
              fallback={
                <Box
                  sx={{
                    height: "100vh",
                    width:'100%',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Loading....
                </Box>
              }
            >
              <List
                isLoading={isLoading}
                childClicked={childClicked}
                places={filteredPlaces.length ? filteredPlaces : places}
                type={type}
                setType={setType}
                rates={rates}
                setRates={setRates}
              />
            </Suspense>
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
            <Suspense
              fallback={
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
              }
            >
              <Map
                setChildClicked={setChildClicked}
                setCoordinates={setCoordinates}
                setBounds={setBounds}
                coordinates={coordinates}
                places={filteredPlaces.length ? filteredPlaces : places}
              />
            </Suspense>
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
