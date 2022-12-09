import { forwardRef } from "react";
import { View } from "react-native";
import { ViewProps } from "react-native/types";

type Props = {
  // Custom props here
} & ViewProps;

// ! Always rename the component name `RENAME_ME` to match the file name
export default forwardRef<View, Props>(function RENAME_ME(
  { children, ...props },
  ref,
) {
  return (
    <View ref={ref} {...props}>
      {children}
    </View>
  );
});
