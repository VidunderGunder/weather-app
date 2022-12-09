import { forwardRef } from "react";
import { Text, View } from "react-native";
import { ViewProps } from "react-native/types";

type Props = {
  location?: string;
  temperature?: string;
} & ViewProps;

export default forwardRef<View, Props>(function WeatherCard(
  { children, location, temperature, ...props },
  ref,
) {
  return (
    <View
      ref={ref}
      {...props}
      className="rounded-lg border-2 border-gray-500 p-4"
    >
      <Text className="text-xl font-semibold text-[#cc66ff]">{location}</Text>
      <Text className="text-white">{temperature}</Text>
      {children}
    </View>
  );
});
