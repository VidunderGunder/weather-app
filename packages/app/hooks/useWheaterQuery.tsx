
import { fetchCurrentWeather, FetchCurrentWeatherProps } from "../functions/open-weather-map";
import { useQuery } from "@tanstack/react-query";
// import { OPEN_WEATHER_MAP_API_KEY } from "@env";
const OPEN_WEATHER_MAP_API_KEY=""

export default function useWheaterQuery({
  cityName,
  latitude,
  longitude,
  language = "en",
  units = "metric",
}: Omit<FetchCurrentWeatherProps, "apiKey">) {
  // Fetch weather data from OpenWeatherMap API
  const { data, isLoading, isError } = useQuery({
    queryKey: ["weather", cityName, latitude, longitude, language, units],
    queryFn: async () => {
      if (typeof cityName === "string")
        return await fetchCurrentWeather({
          apiKey: OPEN_WEATHER_MAP_API_KEY,
          cityName,
          language,
          units,
        });
      if (typeof latitude === "number" && typeof longitude === "number")
        return await fetchCurrentWeather({
          apiKey: OPEN_WEATHER_MAP_API_KEY,
          latitude,
          longitude,
          language,
          units,
        });
      throw new Error("Invalid arguments");
    },
  });

  return { data, isLoading, isError };
}
