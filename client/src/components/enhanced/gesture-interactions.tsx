import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  className?: string;
}

export function SwipeableCard({ children, onSwipeLeft, onSwipeRight, className }: SwipeableCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    startX.current = clientX;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const offset = clientX - startX.current;
    setDragOffset(offset);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    const threshold = 100;
    if (dragOffset > threshold && onSwipeRight) {
      onSwipeRight();
    } else if (dragOffset < -threshold && onSwipeLeft) {
      onSwipeLeft();
    }
    
    setIsDragging(false);
    setDragOffset(0);
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "transition-transform duration-200 cursor-grab active:cursor-grabbing",
        isDragging && "transform scale-105 shadow-xl",
        className
      )}
      style={{
        transform: `translateX(${dragOffset}px) ${isDragging ? 'rotate(' + (dragOffset * 0.1) + 'deg)' : ''}`
      }}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
    >
      {children}
      {isDragging && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      )}
    </div>
  );
}

interface DoubleTapProps {
  children: React.ReactNode;
  onDoubleTap: () => void;
  onSingleTap?: () => void;
  className?: string;
}

export function DoubleTap({ children, onDoubleTap, onSingleTap, className }: DoubleTapProps) {
  const [tapCount, setTapCount] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleTap = () => {
    setTapCount(prev => prev + 1);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      if (tapCount === 0) {
        // First tap
        onSingleTap?.();
      } else if (tapCount === 1) {
        // Double tap
        onDoubleTap();
      }
      setTapCount(0);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={cn("select-none", className)}
      onClick={handleTap}
    >
      {children}
    </div>
  );
}

interface LongPressProps {
  children: React.ReactNode;
  onLongPress: () => void;
  delay?: number;
  className?: string;
}

export function LongPress({ children, onLongPress, delay = 800, className }: LongPressProps) {
  const [isPressed, setIsPressed] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleStart = () => {
    setIsPressed(true);
    timeoutRef.current = setTimeout(() => {
      onLongPress();
      setIsPressed(false);
    }, delay);
  };

  const handleEnd = () => {
    setIsPressed(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={cn(
        "transition-all duration-200",
        isPressed && "scale-95 brightness-90",
        className
      )}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
    >
      {children}
    </div>
  );
}

interface DragDropProps {
  children: React.ReactNode;
  onDrop?: (data: any) => void;
  dragData?: any;
  className?: string;
}

export function DragDrop({ children, onDrop, dragData, className }: DragDropProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <div
      className={cn(
        "transition-all duration-200",
        isDragOver && "bg-blue-50 border-blue-300 border-2 border-dashed",
        className
      )}
      draggable={!!dragData}
      onDragStart={(e) => {
        if (dragData) {
          e.dataTransfer.setData('application/json', JSON.stringify(dragData));
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        if (onDrop) {
          try {
            const data = JSON.parse(e.dataTransfer.getData('application/json'));
            onDrop(data);
          } catch (error) {
            console.error('Error parsing drag data:', error);
          }
        }
      }}
    >
      {children}
    </div>
  );
}