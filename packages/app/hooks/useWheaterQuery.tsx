import {
  fetchCurrentWeather,
  FetchCurrentWeatherProps,
} from "../functions/open-weather-map";
import { useQuery } from "@tanstack/react-query";

export default function useWheaterQuery({
  cityName,
  latitude,
  longitude,
  language = "en",
  units = "metric",
}: FetchCurrentWeatherProps) {
  // Fetch weather data from OpenWeatherMap API
  const { data, isLoading, isError } = useQuery({
    queryKey: ["weather", cityName, latitude, longitude, language, units],
    queryFn: async () => {
      if (typeof cityName === "string")
        return await fetchCurrentWeather({
          cityName,
          language,
          units,
        });
      if (typeof latitude === "number" && typeof longitude === "number")
        return await fetchCurrentWeather({
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
