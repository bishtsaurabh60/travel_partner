import {Autocomplete} from "@react-google-maps/api";
import {AppBar, Toolbar, Typography, InputBase, Box} from "@mui/material/";
import SearchIcon from "@mui/icons-material/Search";
import  sxStyle  from "./styles";
import { useTheme } from "@mui/material/styles";
import ModeOfTravelRoundedIcon from "@mui/icons-material/ModeOfTravelRounded";

const Header = ({ onPlaceChanged, onLoad }) => {
  const theme = useTheme();
  const { title, search, searchIcon, inputRoot, inputInput, toolbar } = sxStyle(
    { theme }
  );
  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={[
            toolbar,
            { my: -1 },
            {
              background:
                "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(142,6,232,1) 0%, rgba(252,210,69,1) 100%)",
            },
          ]}
        >
          <Typography variant="h4" sx={title}>
            Travel Partner
            <ModeOfTravelRoundedIcon fontSize="large" />
          </Typography>
          <Box display="flex">
            <Typography variant="h6" sx={title}>
              Explore New Places
            </Typography>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <Box sx={search}>
                <Box sx={searchIcon}>
                  <SearchIcon />
                </Box>
                <InputBase
                  placeholder="Search..."
                  sx={{ "&": inputRoot, input: inputInput }}
                />
              </Box>
            </Autocomplete>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
