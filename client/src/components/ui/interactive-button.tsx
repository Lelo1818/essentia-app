import { Button, ButtonProps } from "@/components/ui/button";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { forwardRef } from "react";

interface InteractiveButtonProps extends ButtonProps {
  soundType?: 'click' | 'success' | 'error' | 'notification';
  enableHover?: boolean;
}

export const InteractiveButton = forwardRef<HTMLButtonElement, InteractiveButtonProps>(
  ({ onClick, onMouseEnter, soundType = 'click', enableHover = true, children, ...props }, ref) => {
    const { playClick, playSuccess, playError, playNotification, playHover } = useSoundEffects();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      switch (soundType) {
        case 'success':
          playSuccess();
          break;
        case 'error':
          playError();
          break;
        case 'notification':
          playNotification();
          break;
        default:
          playClick();
      }
      
      if (onClick) {
        onClick(e);
      }
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (enableHover) {
        playHover();
      }
      
      if (onMouseEnter) {
        onMouseEnter(e);
      }
    };

    return (
      <Button
        ref={ref}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

InteractiveButton.displayName = "InteractiveButton";