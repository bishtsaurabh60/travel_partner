
const sxStyle = ({ theme }) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
    //marginBottom: "30px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height:'400px',
    display: "flex",
    flexDirection:'column',
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: "25px",
  },
  marginBottom: {
    marginBottom: "30px",
  },
  list: {
    p:[0,1,0,1],
    height: "calc(100vh - 225px)",
    overflowY: "auto",
    scrollbarWidth: "none" /* Firefox */,
    "&::-webkit-scrollbar": {
      width: 0,
      height: 0,
    },
  },
});

export default sxStyle;