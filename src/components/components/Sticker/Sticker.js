import React, { useState, useRef,useEffect } from "react";
import { useStickerAnimation } from "./useStickerAnimation";

export const Sticker = (props) => {
  const {
    framesPerRow,
    framesPerColumn,
    src,
    width,
    height,
    totalFrames,
    initialAnimationState = false,
  } = props;
  //   const [animationBegin, setAnimationBegin] = useState(false);

  const imgRef = useRef(null);
  // const animationName=createAnimation(totalFrames,framesPerColumn,framesPerRow,width,height)

  const { translateX, translateY, stopAnimation, setStopAnimation } =
    useStickerAnimation(
      imgRef,
      totalFrames,
      framesPerColumn,
      framesPerRow,
      width,
      height
    );

  useEffect(() => {
    if (initialAnimationState) setStopAnimation(false);
  }, [initialAnimationState]);

  const styles = {
    // animation:`${animationName} 5s`,
    width: width / framesPerColumn,
    backgroundImage: `url(${src})`,
    animationTimingFunction: "steps(4)",
    // animationFillMode: "forwards",
    // animationIterationCount:"infinite",
    // backgroundSize: `${width}px ${height}px`,
    height: height / Math.ceil(totalFrames / framesPerColumn),
    // height: height / framesPerRow,
    // height: "64px",
    imageRendering: "-webkit-optimize-contrast",
    // backgroundPosition:`-0px -0px`

    backgroundPosition: `-${translateX}px -${translateY}px`,
  };

  // console.log(height,Math.ceil(totalFrames / framesPerColumn));

  const beginningStyles = {
    width: width / framesPerColumn,
    backgroundImage: `url(${src})`,
    height: height / Math.ceil(totalFrames / framesPerColumn),
  };

  return (
    <>
      {imgRef !== null ? (
        <div
          style={{ ...styles }}
          onMouseOver={() => {
            setStopAnimation(true);
            // setAnimationBegin(true);
          }}
          onMouseLeave={() => {
            setStopAnimation(false);
            // setAnimationBegin(false);
          }}
          ref={imgRef}
        ></div>
      ) : (
        <p>Halo</p>
      )}
    </>
  );
};
