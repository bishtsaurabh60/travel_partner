import sxStyles from "./styles";
import {
  Box,
  Typography,
  Button,
  CardMedia,
  CardContent,
  Card,
  CardActions,
  Chip,
  Rating,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";

const PlaceDetails = ({ place, selected, refProp }) => {
  const { chip, subtitle, spacing } = sxStyles();

  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <Card elevation={6} sx={{ borderRadius: "1rem" }}>
      <CardMedia
        component="img"
        title={place.name}
        alt={place.name}
        src={
          place.photo
            ? place.photo.images.medium.url
            : "/restaurant.jpg"
        }
        sx={{ height: 250 }}
      />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {place.name}
        </Typography>

        <Box display="flex" justifyContent="space-between" my={2}>
          <Rating value={Number(place.rating)} readOnly name="readOnly" />
          <Typography component="legend" gutterBottom color="textSecondary">
            {place.num_reviews} review{place.num_reviews > 1 && "s"}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="legend">Price</Typography>
          <Typography variant="subtitle1" gutterBottom color="textSecondary">
            {place.price ? place.price : place.price_level}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="legend">Ranking</Typography>
          <Typography variant="subtitle1" gutterBottom color="textSecondary">
            {place.ranking}
          </Typography>
        </Box>

        {place?.awards?.map((award, i) => (
          <Box
            my={1}
            display="flex"
            justifyContent="space-between"
            key={i}
            alignItems="center"
          >
            <img src={award.images.small} alt={award.display_name} />
            <Typography
              variant="subtitle2"
              gutterBottom
              color="textSecondary"
              sx={subtitle}
            >
              {award.display_name}
            </Typography>
          </Box>
        ))}

        {place?.cuisine?.map(({ name }) => (
          <Chip size="small" label={name} sx={chip} key={name} />
        ))}

        {place?.address && (
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={[subtitle, spacing]}
            color="textSecondary"
          >
            <LocationOnIcon /> {place.address}
          </Typography>
        )}

        {place?.phone && (
          <Typography
            variant="body2"
            gutterBottom
            sx={[spacing, subtitle]}
            color="textSecondary"
          >
            <PhoneIcon /> {place.phone}
          </Typography>
        )}

        <CardActions>
          {place?.web_url && (
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                window.open(place.web_url, "_blank");
              }}
            >
              Trip Advisor
            </Button>
          )}
          {place?.website && (
            <Button
              variant="contained"
              size="small"
              sx={{ backgroundColor: "success.main" }}
              onClick={() => {
                window.open(place.website, "_blank");
              }}
            >
              Website
            </Button>
          )}
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
