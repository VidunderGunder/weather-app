import { forwardRef, useMemo } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { Image, Text, View } from "dripsy";
import type { View as ViewType } from "react-native";
import { MotiPressable } from "moti/interactions";
import Card from "./Card";
import { useAnimationState } from "moti";
import { z } from "zod";
import {
  unitSymbols,
  Language,
  Units,
  FetchCurrentWeatherProps,
} from "../functions/open-weather-map";
import useWheaterQuery from "../hooks/useWheaterQuery";

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
} & FetchCurrentWeatherProps &
  Omit<ComponentPropsWithoutRef<typeof MotiPressable>, "children"> &
  ComponentPropsWithoutRef<typeof View>;

export default forwardRef<ViewType, Props>(function WeatherCard(
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
  const { data, isLoading, isError } = useWheaterQuery({
    cityName,
    latitude,
    longitude,
    language,
    units,
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

  const Loading = () => {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  };

  const Error = () => {
    return (
      <View>
        <Text>We f*cked up 😭</Text>
      </View>
    );
  };

  const Success = () => {
    return (
      <>
        <View
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View>
            <Text
              sx={{
                color: "#cc66ff",
                fontSize: 24,
                fontWeight: "600",
              }}
            >
              {title ?? location}
            </Text>
          </View>
          <View>
            <Text
              sx={{
                color: "#ffffffcc",
                fontSize: 18,
              }}
            >
              {typeof temperature === "undefined"
                ? null
                : temperature?.toFixed() + unit}
            </Text>
          </View>
        </View>
        <View
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View>
            <Text
              sx={{
                color: "#ffffffcc",
                fontSize: 18,
              }}
            >
              {typeof description === "string"
                ? description[0]?.toUpperCase() + description?.slice(1)
                : null}
            </Text>
          </View>
          <View>
            <Image
              source={{ uri: iconUrl }}
              sx={{
                marginTop: -10,
                marginBottom: -15,
                marginRight: -7,
                width: 48,
                height: 48,
              }}
            />
          </View>
        </View>
      </>
    );
  };

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
      <Card
        sx={{
          backgroundColor: "#3e2e8569",
        }}
        state={animationState}
      >
        {isLoading ? <Loading /> : isError ? <Error /> : <Success />}
      </Card>
    </MotiPressable>
  );
});
