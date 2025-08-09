import { useEffect, useMemo } from "react";

import { Gradient } from "@/lib/gradient";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type AnimatedBackgroundProps = {
  target?: string;
  children?: React.ReactNode;
  className?: string;
  canvasClassName?: string;
  gradientOpts?: any;
  containerClassName?: string;
};
const AnimatedBackground = ({
  children,
  target = "gradient-canvas",
  className,
  canvasClassName,
  gradientOpts,
  containerClassName,
}: AnimatedBackgroundProps) => {
  const { resolvedTheme } = useTheme();
  const gradient = useMemo(() => new Gradient(gradientOpts), []);

  useEffect(() => {
    // @ts-expect-error
    gradient.initGradient(`#${target}`);

    return () => gradient.disconnect();
  }, [resolvedTheme]);

  return (
    <div
      className={cn(
        "relative grain h-full w-full flex flex-col overflow-hidden ",
        containerClassName,
      )}
    >
      <style>
        {`
          #gradient-canvas-3 {
            width:100%;
            height:100%;
            --gradient-color-1: #8600af;
            --gradient-color-2: #e9b421;
            --gradient-color-3: #616163;
            --gradient-color-4: #b5c0ff;
          }

          #gradient-canvas-2 {
            width:100%;
            height:100%;
            --gradient-color-1: #8600af;
            --gradient-color-2: #e9b421;
            --gradient-color-3: #616163;
            --gradient-color-4: #b5c0ff;
          }

          #gradient-canvas {
            width:100%;
            height:100%;
            --gradient-color-1: #8600af;
            --gradient-color-2: #e9b421;
            --gradient-color-3: #616163;
            --gradient-color-4: #b5c0ff;
          }
        `}
      </style>
      <div
        className={cn(
          "absolute -z-50 h-full w-full overflow-hidden",
          className,
        )}
      >
        <div className="overflow-hidden h-full">
          <canvas
            id={target}
            className={cn(
              "w-full h-full blur-xl scale-110 brightness-[35%] saturate-150 contrast-150",
              canvasClassName,
            )}
            data-transition-in
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default AnimatedBackground;
