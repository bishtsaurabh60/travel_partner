import axios from "axios";

export const getPlaceData = async (type, sw, ne) => {
  try {
    const controller = new AbortController();
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          bl_longitude: sw.lng,
          tr_latitude: ne.lat,
          tr_longitude: ne.lng,
        },
        headers: {
          "X-RapidAPI-Key":
            "e3ce987e7dmshfd25596b40050b8p18a651jsnd170a1faa031",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
        signal: controller.signal,
      }
      );
      controller.abort();
    return data;
  } catch (error) {
    console.log(error);
  }
};
