import { useEffect } from "react";

import { Gradient } from "@/lib/gradient";

const gradient = new Gradient();

const AnimatedBackground = ({ children }: { children?: React.ReactNode }) => {
  useEffect(() => {
    // @ts-expect-error
    gradient.initGradient("#gradient-canvas");

    return () => gradient.disconnect();
  }, []);

  return (
    <div className="relative h-full flex flex-col overflow-hidden">
      <style>
        {`     
          #gradient-canvas {
            width:100%;
            height:100%;
            --gradient-color-1: #e4b2ff; 
            --gradient-color-2: #ffb2b2;  
            --gradient-color-3: #8294ff; 
            --gradient-color-4: #fff;
          }

          .dark #gradient-canvas {
            width:100%;
            height:100%;
            --gradient-color-1: #8600af; 
            --gradient-color-2: #e9b421; 
            --gradient-color-3: #616163;  
            --gradient-color-4: #b5c0ff;
          }
        `}
      </style>
      <div className="absolute -z-50 p-2 sm:p-8 h-full w-full overflow-hidden ">
        <div className="rounded-xl overflow-hidden h-full">
          <canvas
            id="gradient-canvas"
            className="w-full h-full blur-xl scale-110 dark:brightness-50 dark:saturate-150 dark:contrast-150"
            data-transition-in
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default AnimatedBackground;
