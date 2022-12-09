import { forwardRef } from "react";
import { View } from "react-native";
import { ViewProps } from "react-native/types";

type Props = {
  // Custom props here
} & ViewProps;

export default forwardRef<View, Props>(function Card(
  { children, ...props },
  ref,
) {
  return (
    <View
      ref={ref}
      {...props}
      className="rounded-lg border-2 border-gray-500 p-4"
    >
      {children}
    </View>
  );
});
