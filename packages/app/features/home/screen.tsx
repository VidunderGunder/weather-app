import { FlashList } from "@shopify/flash-list";
import { Text, View, SafeAreaView } from "dripsy";
import WeatherCard, { isWheaterCardInput } from "../../components/WeatherCard";
import type { WheaterInputData } from "../../components/WeatherCard";
import useLocation from "../../hooks/useLocation";

const exampleLocations: WheaterInputData[] = [
  { cityName: "Oslo" },
  { cityName: "London" },
  { cityName: "New York" },
  { cityName: "San Francisco" },
  { cityName: "Tokyo" },
  { latitude: 55.9139, longitude: 10.7522 },
];

export const HomeScreen = () => {
  const { location } = useLocation();

  const formattedLocation: Partial<WheaterInputData> = {
    latitude: location?.coords.latitude,
    longitude: location?.coords.longitude,
    title: "Your location",
  };

  const locations: WheaterInputData[] = isWheaterCardInput(formattedLocation)
    ? [formattedLocation, ...exampleLocations]
    : exampleLocations;

  return (
    <SafeAreaView
      sx={{
        height: "100%",
        width: "100%",
        backgroundColor: "#2e026d",
      }}
    >
      <View
        sx={{
          height: "100%",
          width: "100%",
          padding: 2,
        }}
      >
        <Text
          sx={{
            color: "white",
            // fontSize: 5,
            fontWeight: "bold",
            textAlign: "center",
            paddingTop: 1,
            paddingBottom: 4,
          }}
        >
          Weather{" "}
          <Text
            sx={{
              color: "#cc66ff",
            }}
          >
            App
          </Text>{" "}
          🌤
        </Text>
        <FlashList
          data={locations}
          numColumns={1}
          renderItem={({ item }) => (
            <WeatherCard {...item} sx={{ margin: 1 }} />
          )}
          estimatedItemSize={50}
        />
      </View>
    </SafeAreaView>
  );
};
