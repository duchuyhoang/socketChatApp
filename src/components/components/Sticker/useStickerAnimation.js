import { useState, useEffect } from "react";

export const useStickerAnimation = (
  elementRef,
  totalFrames,
  framesPerColumn,
  framesPerRow,
  width,
  height,
  initialStopStatus = false
) => {
  const [i, setI] = useState(0);
  const [stepY, setStepY] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [stopAnimation, setStopAnimation] = useState(() => initialStopStatus);
  const step = Math.ceil(width / framesPerColumn);
  useEffect(() => {
    const animationInterval = setInterval(() => {
        if(!stopAnimation){
            if (i < totalFrames) {
                let translateX = 0;
                let translateY = 0;
        
                // Star a new row
                if (i % framesPerColumn === 0 && i != 0)
                  setStepY((prev) => {
                    return prev + 1;
                  });
        
                if (i < framesPerColumn) {
                  translateX = step * i;
                  translateY = step * stepY;
                } else {
                  translateX = step * (i % framesPerColumn);
                  translateY =
                    i % framesPerColumn === 0 ? step * (stepY + 1) : step * stepY;
                }
        
                setI((prev) => {
                  return prev + 1;
                });
        
                if (elementRef) {
                  // elementRef.current.style.backgroundPosition = `-${translateX}px -${translateY}px`;
                  setTranslateX(translateX);
                  setTranslateY(translateY);
                }
              } else {
                // clearInterval(animationInterval)
                setI(0);
                setStepY(0);
              }
        }
        else{
            setTranslateX(0);
            setTranslateY(0);
        }
     
    }, 1000 / totalFrames);

    return () => {
      clearInterval(animationInterval);
      if (stepY > Math.floor(totalFrames / framesPerColumn)) {
        setI(0);
        setStepY(0);
      }
    };
  }, [i, stepY,stopAnimation]);

  return {
    translateX,
    translateY,
    stopAnimation,
    setStopAnimation,
  };
};
