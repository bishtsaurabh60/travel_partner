import { Paper, Box, Typography, useMediaQuery, Rating } from "@mui/material";
import sxStyle from "./styles";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useTheme } from "@mui/material/styles";

const MapPlace = ({place, lat, lng}) => {
  const { paper, pointer, markerContainer } = sxStyle();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box sx={markerContainer} lat={lat} lng={lng}>
      {!isDesktop ? (
        <LocationOnOutlinedIcon color="primary" fontSize="large" />
      ) : (
        <Paper elevation={4} sx={[paper, pointer]}>
          <Typography variant="subtitle2" gutterBottom>
            {place.name}
          </Typography>
          <img
            src={
              place.photo
                ? place.photo.images.thumbnail.url
                : "/restaurant.jpg"
            }
              alt={place.name}
              loading='lazy'
              height={80}
              width={85}
          />
          <Rating
            size="small"
            name="read-only"
            value={Number(place.rating)}
            readOnly
          />
        </Paper>
      )}
    </Box>
  );
};

export default MapPlace;
