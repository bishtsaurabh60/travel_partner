import { Box, Skeleton } from "@mui/material";
import sxStyle from "../List/styles";

const SkeletonLoad = () => {
  const loading = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <Box sx={loading}>
      <Skeleton width="100%" height="400px" />
      <Skeleton width="100%" />
      <Skeleton width="100%" />
      <Skeleton width="100%" />
    </Box>
  );
}
export default SkeletonLoad;