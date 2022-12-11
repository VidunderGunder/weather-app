import { ComponentPropsWithoutRef, forwardRef } from "react";
import { MotiView } from "moti";
import classNames from "classnames";

type Props = {
  // Custom props here
} & ComponentPropsWithoutRef<typeof MotiView>;

export default forwardRef<typeof MotiView, Props>(function Card(
  { children, className, ...props },
  ref,
) {
  return (
    <MotiView
      ref={ref}
      {...props}
      className={classNames("rounded-lg bg-white bg-opacity-10 p-4", className)}
    >
      {children}
    </MotiView>
  );
});
