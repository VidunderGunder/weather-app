import { forwardRef, useMemo } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { Image, Text, View } from "react-native";
import { ViewProps } from "react-native";
import { MotiPressable } from "moti/interactions";
import Card from "./Card";
import { useQuery } from "@tanstack/react-query";
import { OPEN_WEATHER_MAP_API_KEY } from "@env";
import {
  fetchCurrentWeather,
  unitSymbols,
  Language,
  Units,
} from "@acme/shared";
import { useAnimationState } from "moti";
import { z } from "zod";

export const WheaterCardInputSchema = z
  .union([
    z.object({
      latitude: z.number(),
      longitude: z.number(),
      cityName: z.undefined().optional(),
    }),
    z.object({
      cityName: z.string(),
      latitude: z.undefined().optional(),
      longitude: z.undefined().optional(),
    }),
  ])
  .and(
    z.object({
      language: Language.optional(),
      units: Units.optional(),
      title: z.string().optional(),
    }),
  );
export type WheaterInputData = z.infer<typeof WheaterCardInputSchema>;
export function isWheaterCardInput(data: unknown): data is WheaterInputData {
  return WheaterCardInputSchema.safeParse(data).success;
}

export type Props = {
  title?: string;
} & Omit<
  typeof fetchCurrentWeather extends (args: infer T) => unknown ? T : never,
  "apiKey"
> &
  Omit<ComponentPropsWithoutRef<typeof MotiPressable>, "children"> &
  ViewProps;

export default forwardRef<View, Props>(function WeatherCard(
  {
    title,
    cityName,
    latitude,
    longitude,
    language = "en",
    units = "metric",
    ...props
  },
  ref,
) {
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

  const unit = unitSymbols[units];
  const temperature = data?.main?.temp;
  const location = data?.name;
  const description = data?.weather?.[0]?.description;
  const icon = data?.weather?.[0]?.icon;
  const iconSize: "@2x" | "@4x" | "" = "@4x";
  const iconUrl = `https://openweathermap.org/img/wn/${icon}${iconSize}.png`;

  function handleOpenWeatherDetails() {
    // TODO: Open weather details
  }

  const animationState = useAnimationState({
    from: {
      opacity: 0,
      scale: 0.875,
    },
    to: {
      opacity: 1,
      scale: 1.025,
    },
    ready: {
      opacity: 1,
      scale: 1,
    },
  });

  if (animationState.current === "to" && !isLoading && !isError) {
    animationState.transitionTo("ready");
  }

  return (
    <MotiPressable
      ref={ref}
      onPress={handleOpenWeatherDetails}
      transition={{
        type: "timing",
        duration: 35,
      }}
      animate={useMemo(
        () =>
          ({ hovered, pressed }) => {
            "worklet";

            return {
              opacity: hovered || pressed ? 0.5 : 1,
              scale: pressed ? 0.9975 : 1,
            };
          },
        [],
      )}
      {...props}
    >
      <Card className="bg-[#3e2e8569]" state={animationState}>
        <View className="align-center flex flex-row justify-between">
          <View>
            <Text className="text-xl font-semibold text-[#cc66ff]">
              {title ?? location}
            </Text>
          </View>
          <View>
            <Text className="text-lg  text-[#ffffffcc]">
              {typeof temperature === "undefined"
                ? null
                : temperature?.toFixed() + unit}
            </Text>
          </View>
        </View>
        <View className="align-center flex flex-row justify-between">
          <View>
            <Text className="text-lg  text-[#ffffffcc]">
              {typeof description === "string"
                ? description[0]?.toUpperCase() + description?.slice(1)
                : null}
            </Text>
          </View>
          <View>
            <Image
              source={{ uri: iconUrl }}
              style={{
                marginTop: -10,
                marginBottom: -15,
                marginRight: -7,
                width: 48,
                height: 48,
              }}
            />
          </View>
        </View>
      </Card>
    </MotiPressable>
  );
});
