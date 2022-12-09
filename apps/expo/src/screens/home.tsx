import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/WeatherCard";

export const HomeScreen = () => {
  return (
    <SafeAreaView className="bg-[#2e026d] bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <View className="h-full w-full p-4">
        <Text className="mx-auto pb-2 text-5xl font-bold text-white">
          Weather <Text className="text-[#cc66ff]">App</Text> 🌤
        </Text>
        <Card></Card>
      </View>
    </SafeAreaView>
  );
};