import { alpha } from "@mui/material/styles";

const sxStyle = ({ theme }) => ({
  title: {
    filter: 'drop-shadow(5px 8px 4px #444)',
    display: {
      sm: "block",
      xs: "none",
    },
  },

  search: {
    position: "relative",
    borderRadius: 1,
    bgcolor: alpha(theme.palette.common.black, 0.15),
    "&:hover": {
      bgcolor: alpha(theme.palette.common.white, 0.25),
    },
    mr: theme.spacing(2),
    ml: { sm: theme.spacing(3), xs: 0 },
    width: { sm: "auto", xs: "100%" },
  },
  searchIcon: {
    padding: [0, 2],
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    pl: `calc(1em + 32px)`,
    transition: theme.transitions.create("width"),
    width: { md: "20ch", xs: "100%" },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
});

export default sxStyle;