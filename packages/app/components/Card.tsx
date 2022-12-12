import { ComponentPropsWithoutRef, forwardRef } from "react";
import { MotiView } from "moti";
import { styled } from "dripsy";

const DripsyMotiView = styled(MotiView)();

type Props = {
  // Custom props here
} & ComponentPropsWithoutRef<typeof DripsyMotiView>;

export default forwardRef<typeof DripsyMotiView, Props>(function Card(
  { children, sx, ...props },
  ref,
) {
  return (
    <DripsyMotiView
      ref={ref}
      {...props}
      sx={{
        borderRadius: "lg",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: 4,
        ...sx,
      }}
    >
      {children}
    </DripsyMotiView>
  );
});
