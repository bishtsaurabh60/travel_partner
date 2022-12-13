import sxStyle from "./styles";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React,{Suspense, useState, useEffect, createRef} from "react";
import SkeletonLoad from "../skeleton/SkeletonLoad";

const PlaceDetails = React.lazy(() => import("../PlaceDetails/PlaceDetails"));

const List = ({
  places,
  childClicked,
  isLoading,
  type,
  setType,
  rates,
  setRates,
}) => {
  const theme = useTheme();
  const { formControl,loading, container, list } =
    sxStyle({ theme });

  const placesCategory = ["restaurants", "hotels", "attractions"];
  const ratings = [0,1,2,3, 4, 4.5];
  const [elRefs, setElRefs] = useState([]);
  
  useEffect(() => {
    if (places?.length) 
      setElRefs((refs) => places.map((_, i) => refs[i] || createRef()));
  },[places]);

  return (
    <Box sx={container}>
      <Typography variant="h4">Places Around You</Typography>
      {isLoading ? (
        <Box sx={loading}>
          <CircularProgress size="5rem" />
        </Box>
      ) : (
        <>
          <FormControl sx={formControl} size="small" variant="standard">
            <InputLabel id="typeLabel">Type</InputLabel>
            <Select
              labelId="typeLabel"
              id="typeLabel"
              value={type}
              label="Type"
              onChange={(e) => setType(e.target.value)}
            >
              {placesCategory.map((place, i) => (
                <MenuItem key={`${place}+id${i}`} value={place}>
                  {place.charAt(0).toUpperCase() + place.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={formControl} size="small" variant="standard">
            <InputLabel id="ratingLabel">Rating</InputLabel>
            <Select
              labelId="ratingLabel"
              id="ratingLabel"
              value={rates}
              label="Rating"
              onChange={(e) => setRates(e.target.value)}
            >
              {ratings.map((rate, i) => (
                <MenuItem key={`${rate}+id${i}`} value={rate}>
                  {rate === 0 ? "All" : `Above ${rate}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {places?.length && (
            <Typography variant="subtitle2" sx={{ ml: 1 }}>
              Displaying {places.length} result
              {places.length === 1 ? "" : "s"}
            </Typography>
          )}
          <Grid container spacing={2} sx={[list, { mt: "4px" }]}>
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12}>
                <Suspense fallback={<SkeletonLoad />}>
                  <PlaceDetails
                    selected={Number(childClicked) === i}
                    refProp={elRefs[i]}
                    place={place}
                  />
                </Suspense>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default List;
