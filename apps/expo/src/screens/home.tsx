import { FlashList } from "@shopify/flash-list";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WeatherCard, { isWheaterCardInput } from "../components/WeatherCard";
import type { WheaterInputData } from "../components/WeatherCard";
import useLocation from "../hooks/useLocation";

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
    <SafeAreaView className="bg-[#2e026d] bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <View className="h-full w-full p-2">
        <Text className="mx-auto pt-1 pb-4 text-5xl font-bold text-white">
          Weather <Text className="text-[#cc66ff]">App</Text> 🌤
        </Text>
        <FlashList
          data={locations}
          numColumns={1}
          renderItem={({ item }) => <WeatherCard {...item} className="m-1" />}
          estimatedItemSize={50}
        />
      </View>
    </SafeAreaView>
  );
};
