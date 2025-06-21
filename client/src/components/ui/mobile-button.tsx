import { forwardRef } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface MobileButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const MobileButton = forwardRef<HTMLButtonElement, MobileButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "min-h-[44px] min-w-[44px] touch-manipulation active:scale-95 transition-transform",
          "md:min-h-auto md:min-w-auto",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

MobileButton.displayName = "MobileButton";

export { MobileButton };